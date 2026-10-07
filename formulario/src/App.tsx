import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FormAnswers,
  RoofType,
  LeadSubmissionPayload,
  PropertyType,
} from './types/form';
import {
  brandConfig,
  propertyTypesConfig,
  ownershipStatusConfig,
  ownershipStatusConfigPJ,
  energyBillRangesPF,
  energyBillRangesPJ,
  mainGoalsConfig,
  timelineConfig,
} from './config/formConfig';
import { calculateSolarEconomy } from './utils/calculator';
import { submitLeadWebhook } from './utils/webhook';
import { useKeyboardNav } from './hooks/useKeyboardNav';

import { TopHeader } from './components/TopHeader';
import { StepContainer } from './components/StepContainer';
import { StepName } from './components/steps/StepName';
import { StepLeadType } from './components/steps/StepLeadType';
import { StepOwnership } from './components/steps/StepOwnership';
import { StepEnergyBill } from './components/steps/StepEnergyBill';
import { StepRoofType } from './components/steps/StepRoofType';
import { StepGoal } from './components/steps/StepGoal';
import { StepTimeline } from './components/steps/StepTimeline';
import { StepLocation } from './components/steps/StepLocation';
import { StepContact } from './components/steps/StepContact';
import { SuccessScreen } from './components/SuccessScreen';

export const App: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<number>(1);
  const [protocol, setProtocol] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const submittingRef = useRef(false);

  const totalSteps = 9;

  useEffect(() => {
    document.title = `Diagnóstico Solar | ${brandConfig.companyName}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      `Simule sua economia com energia solar com ${brandConfig.companyName}.`
    );
    document.querySelector('link[rel="icon"]')?.setAttribute('href', brandConfig.faviconUrl);
  }, []);

  // Smooth minimalist entrance sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Preload optimized roof images in background so Step 5 renders instantly
  useEffect(() => {
    const roofImages = [
      '/simulador/models/ceramico.webp',
      '/simulador/models/metalico.webp',
      '/simulador/models/fibrocimento.webp',
      '/simulador/models/laje.webp',
      '/simulador/models/solo.webp',
    ];
    roofImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const [answers, setAnswers] = useState<FormAnswers>({
    leadType: 'pf',
    propertyType: undefined,
    pjSegment: undefined,
    monthlyBill: undefined,
    roofType: undefined,
    ownership: undefined,
    mainGoal: undefined,
    timeline: undefined,
    city: '',
    state: 'SC',
    fullName: '',
    companyName: '',
    cnpj: '',
    phone: '',
    email: '',
  });

  const isPJ = answers.leadType === 'pj';
  const firstName = answers.fullName.trim().split(' ')[0] || '';

  // Handler for selecting property/project type in Step 2
  const handleSelectPropertyType = (type: PropertyType) => {
    const isBusiness = type !== 'residencial';
    setAnswers((prev) => ({
      ...prev,
      propertyType: type,
      leadType: isBusiness ? 'pj' : 'pf',
      pjSegment:
        type === 'comercial'
          ? 'comercio'
          : type === 'rural'
          ? 'agro'
          : type === 'industrial'
          ? 'industria'
          : undefined,
      monthlyBill: undefined,
    }));
  };

  // Form submission logic
  const handleSubmitForm = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmissionError('');
    const generatedProtocol = `Protocolo CLA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const metrics = calculateSolarEconomy(answers.monthlyBill || 500);

    const payload: LeadSubmissionPayload = {
      protocol: generatedProtocol,
      timestamp: new Date().toISOString(),
      lead: {
        leadType: answers.leadType,
        fullName: answers.fullName.trim(),
        companyName: answers.companyName?.trim(),
        cnpj: answers.cnpj?.trim(),
        phone: answers.phone.trim(),
        email: answers.email.trim().toLowerCase(),
        city: answers.city.trim(),
        state: answers.state,
        propertyType: answers.propertyType,
        pjSegment: answers.pjSegment,
        monthlyBill: answers.monthlyBill || 500,
        roofType: answers.roofType,
        ownership: answers.ownership,
        mainGoal: answers.mainGoal,
        timeline: answers.timeline,
      },
      metrics: {
        estimatedAnnualSavings: metrics.annualSavings,
        estimated25YearsSavings: metrics.twentyFiveYearsSavings,
        savingsPercentage: metrics.savingsPercentage,
      },
      source: `${brandConfig.companyName} - Quiz BANT (${answers.leadType.toUpperCase()})`,
    };

    try {
      const result = await submitLeadWebhook(payload, brandConfig.webhookUrl);
      if (result.success) {
        setProtocol(generatedProtocol);
        setIsCompleted(true);
      } else {
        setSubmissionError(result.error || 'Não foi possível enviar. Tente novamente.');
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [answers]);

  // Step advance validator and navigator
  const goToNextStep = useCallback(() => {
    if (currentStep === 1 && answers.fullName.trim().length < 2) return;
    if (currentStep === 2 && !answers.propertyType) return;
    if (currentStep === 3 && !answers.ownership) return;
    if (currentStep === 4 && !answers.monthlyBill) return;
    if (currentStep === 5 && !answers.roofType) return;
    if (currentStep === 6 && !answers.mainGoal) return;
    if (currentStep === 7 && !answers.timeline) return;
    if (currentStep === 8 && answers.city.trim().length < 2) return;
    if (currentStep === 9) {
      const cleanPhone = answers.phone.replace(/\D/g, '');
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim());
      const validName = answers.fullName.trim().length >= 2;
      if (!validName || cleanPhone.length < 10 || !validEmail) return;
      handleSubmitForm();
      return;
    }

    setDirection(1);
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  }, [currentStep, answers, totalSteps, handleSubmitForm]);

  const goToPrevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  // Option cards call this after selecting an answer to advance smoothly
  const advanceAfterChoice = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  }, [totalSteps]);

  const handleExit = useCallback(() => {
    window.location.href = brandConfig.landingPageUrl;
  }, []);

  // Keyboard navigation mapping for quick option selection across all BANT steps
  const handleSelectOptionByIndex = useCallback(
    (index: number) => {
      if (isCompleted || isSubmitting) return;

      if (currentStep === 2) {
        const option = propertyTypesConfig[index];
        if (option) {
          handleSelectPropertyType(option.id);
          setTimeout(() => {
            setDirection(1);
            setCurrentStep(3);
          }, 180);
        }
      } else if (currentStep === 3) {
        const optionsList = isPJ ? ownershipStatusConfigPJ : ownershipStatusConfig;
        const option = optionsList[index];
        if (option) {
          setAnswers((prev) => ({ ...prev, ownership: option.id }));
          setTimeout(() => {
            setDirection(1);
            setCurrentStep(4);
          }, 180);
        }
      } else if (currentStep === 4) {
        const billRanges = isPJ ? energyBillRangesPJ : energyBillRangesPF;
        const option = billRanges[index];
        if (option) {
          setAnswers((prev) => ({ ...prev, monthlyBill: option.numericValue }));
          setTimeout(() => {
            setDirection(1);
            setCurrentStep(5);
          }, 180);
        }
      } else if (currentStep === 5) {
        const roofKeys: RoofType[] = ['ceramico', 'metalico', 'fibrocimento', 'laje', 'solo'];
        const key = roofKeys[index];
        if (key) {
          setAnswers((prev) => ({ ...prev, roofType: key }));
        }
      } else if (currentStep === 6) {
        const goal = mainGoalsConfig[index];
        if (goal) {
          setAnswers((prev) => ({ ...prev, mainGoal: goal.id }));
          setTimeout(() => {
            setDirection(1);
            setCurrentStep(7);
          }, 180);
        }
      } else if (currentStep === 7) {
        const timeOpt = timelineConfig[index];
        if (timeOpt) {
          setAnswers((prev) => ({ ...prev, timeline: timeOpt.id }));
          setTimeout(() => {
            setDirection(1);
            setCurrentStep(8);
          }, 180);
        }
      }
    },
    [currentStep, isPJ, isCompleted, isSubmitting]
  );

  useKeyboardNav({
    onSelectOption: handleSelectOptionByIndex,
    onEnter: goToNextStep,
    onEscape: handleExit,
    enabled: !isCompleted && !isSubmitting,
  });

  return (
    <div
      style={{
        '--brand-accent': brandConfig.accentColor,
        '--brand-accent-hover': brandConfig.accentHoverColor,
        '--brand-accent-soft': brandConfig.accentSoftColor,
        '--brand-accent-text': brandConfig.accentTextColor,
      } as React.CSSProperties}
      className="relative min-h-[100dvh] bg-[#F8FAFC] text-neutral-900 overflow-x-clip font-sans flex flex-col"
    >
      {/* Subtle Atmosphere Glow */}
      <div className="atmosphere-glow" />

      {/* Minimalist Instant Loading Screen */}
      <AnimatePresence>
        {!isAppReady && (
          <motion.div
            key="app-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 select-none"
          >
            <div className="flex flex-col items-center">
              <img
                src={brandConfig.logoUrl}
                alt={brandConfig.companyName}
                className="h-11 sm:h-12 w-auto max-w-[220px] object-contain mb-7 select-none"
              />
              <div className="w-36 h-[2.5px] bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-[#135c94] rounded-full"
                  initial={{ left: '-40%', width: '35%' }}
                  animate={{ left: '100%', width: '35%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header with Blur Reveal entrance */}
      <motion.div
        initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
        animate={{
          opacity: isAppReady ? 1 : 0,
          y: isAppReady ? 0 : -10,
          filter: isAppReady ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
        className="w-full relative z-40"
      >
        <TopHeader
          currentStep={isCompleted ? totalSteps : currentStep}
          totalSteps={totalSteps}
          onBack={goToPrevStep}
          onExit={handleExit}
          showExit={!isCompleted}
        />
      </motion.div>

      {/* Main Container - Centered and Blur Reveal entrance */}
      <motion.main
        initial={{ opacity: 0, y: 18, filter: 'blur(16px)', scale: 0.98 }}
        animate={{
          opacity: isAppReady ? 1 : 0,
          y: isAppReady ? 0 : 18,
          filter: isAppReady ? 'blur(0px)' : 'blur(16px)',
          scale: isAppReady ? 1 : 0.98,
        }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-0 pt-[58px] pb-0 w-full transform-gpu min-h-[100dvh]"
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <SuccessScreen
              key="success-step"
              fullName={answers.fullName}
              protocol={protocol}
              onRedirectNow={handleExit}
            />
          ) : (
            <div key={`step-${currentStep}`} className="w-full flex-1 flex justify-center items-stretch">
              {/* STEP 1: Nome do Lead (Apresentação & Quebra de Gelo) */}
              {currentStep === 1 && (
                <StepContainer
                  stepNumber={1}
                  totalSteps={totalSteps}
                  title="Como podemos chamar você?"
                  onNext={goToNextStep}
                  onBack={goToPrevStep}
                  nextDisabled={answers.fullName.trim().length < 2}
                  showNextButton={true}
                  direction={direction}
                >
                  <StepName
                    value={answers.fullName}
                    onChange={(val) => setAnswers((prev) => ({ ...prev, fullName: val }))}
                    onEnter={goToNextStep}
                  />
                </StepContainer>
              )}

              {/* STEP 2: Perfil do Projeto (Cita o nome do lead) */}
              {currentStep === 2 && (
                <StepContainer
                  stepNumber={2}
                  totalSteps={totalSteps}
                  title={
                    firstName
                      ? `${firstName}, para onde será o projeto de energia solar?`
                      : 'Para onde será o projeto de energia solar?'
                  }
                  showNextButton={false}
                  direction={direction}
                >
                  <StepLeadType
                    value={answers.propertyType}
                    onChange={handleSelectPropertyType}
                    onAutoAdvance={advanceAfterChoice}
                  />
                </StepContainer>
              )}

              {/* STEP 3: Authority (Neutro - Não cita o nome) */}
              {currentStep === 3 && (
                <StepContainer
                  stepNumber={3}
                  totalSteps={totalSteps}
                  title="Qual é a sua relação com o imóvel?"
                  showNextButton={false}
                  direction={direction}
                >
                  <StepOwnership
                    value={answers.ownership}
                    onChange={(val) => setAnswers((prev) => ({ ...prev, ownership: val }))}
                    onAutoAdvance={advanceAfterChoice}
                    leadType={answers.leadType}
                  />
                </StepContainer>
              )}

              {/* STEP 4: Budget (Cita o nome do lead) */}
              {currentStep === 4 && (
                <StepContainer
                  stepNumber={4}
                  totalSteps={totalSteps}
                  title={
                    firstName
                      ? `${firstName}, qual é o valor médio da conta de luz?`
                      : 'Qual é o valor médio da conta de luz?'
                  }
                  subtitle="Uma estimativa já é suficiente."
                  showNextButton={false}
                  direction={direction}
                >
                  <StepEnergyBill
                    value={answers.monthlyBill}
                    onChange={(val) => setAnswers((prev) => ({ ...prev, monthlyBill: val }))}
                    onAutoAdvance={advanceAfterChoice}
                    leadType={answers.leadType}
                  />
                </StepContainer>
              )}

              {/* STEP 5: Engenharia / Telhado (Neutro - Não cita o nome) */}
              {currentStep === 5 && (
                <StepContainer
                  stepNumber={5}
                  totalSteps={totalSteps}
                  title="Qual é o tipo de telhado do imóvel?"
                  onNext={goToNextStep}
                  onBack={goToPrevStep}
                  nextDisabled={!answers.roofType}
                  showNextButton={true}
                  direction={direction}
                  maxWidth="4xl"
                >
                  <StepRoofType
                    value={answers.roofType}
                    onChange={(val) => setAnswers((prev) => ({ ...prev, roofType: val }))}
                  />
                </StepContainer>
              )}

              {/* STEP 6: Need / Gargalo (Cita o nome do lead) */}
              {currentStep === 6 && (
                <StepContainer
                  stepNumber={6}
                  totalSteps={totalSteps}
                  title={
                    firstName
                      ? `${firstName}, qual gargalo você quer resolver primeiro?`
                      : 'Qual gargalo você quer resolver primeiro?'
                  }
                  showNextButton={false}
                  direction={direction}
                >
                  <StepGoal
                    value={answers.mainGoal}
                    onChange={(val) => setAnswers((prev) => ({ ...prev, mainGoal: val }))}
                    onAutoAdvance={advanceAfterChoice}
                  />
                </StepContainer>
              )}

              {/* STEP 7: Timeline / Prazo (Neutro - Não cita o nome) */}
              {currentStep === 7 && (
                <StepContainer
                  stepNumber={7}
                  totalSteps={totalSteps}
                  title="Quando você gostaria de começar?"
                  showNextButton={false}
                  direction={direction}
                >
                  <StepTimeline
                    value={answers.timeline}
                    onChange={(val) => setAnswers((prev) => ({ ...prev, timeline: val }))}
                    onAutoAdvance={advanceAfterChoice}
                  />
                </StepContainer>
              )}

              {/* STEP 8: Localização (Neutro - Não cita o nome) */}
              {currentStep === 8 && (
                <StepContainer
                  stepNumber={8}
                  totalSteps={totalSteps}
                  title="Em qual cidade fica o imóvel?"
                  onNext={goToNextStep}
                  onBack={goToPrevStep}
                  nextDisabled={answers.city.trim().length < 2}
                  showNextButton={true}
                  direction={direction}
                >
                  <StepLocation
                    city={answers.city}
                    state={answers.state}
                    onChangeCity={(c) => setAnswers((prev) => ({ ...prev, city: c }))}
                    onChangeState={(s) => setAnswers((prev) => ({ ...prev, state: s }))}
                    onEnter={goToNextStep}
                  />
                </StepContainer>
              )}

              {/* STEP 9: Contato Final (Cita o nome no fechamento) */}
              {currentStep === 9 && (
                <StepContainer
                  stepNumber={9}
                  totalSteps={totalSteps}
                  title={
                    firstName
                      ? `Onde você prefere receber a simulação, ${firstName}?`
                      : 'Onde você prefere receber a simulação?'
                  }
                  subtitle="A World Place Solar entrará em contato para conversar sobre a sua simulação."
                  onNext={goToNextStep}
                  onBack={goToPrevStep}
                  nextLabel={isSubmitting ? 'Enviando...' : 'Solicitar minha simulação'}
                  nextDisabled={
                    isSubmitting ||
                    answers.phone.replace(/\D/g, '').length < 10 ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())
                  }
                  showNextButton={true}
                  direction={direction}
                  submissionError={submissionError}
                >
                  <StepContact
                    phone={answers.phone}
                    email={answers.email}
                    companyName={answers.companyName}
                    cnpj={answers.cnpj}
                    onChangePhone={(p) => setAnswers((prev) => ({ ...prev, phone: p }))}
                    onChangeEmail={(e) => setAnswers((prev) => ({ ...prev, email: e }))}
                    onChangeCompanyName={(comp) => setAnswers((prev) => ({ ...prev, companyName: comp }))}
                    onChangeCnpj={(cnpj) => setAnswers((prev) => ({ ...prev, cnpj }))}
                    leadType={answers.leadType}
                    onEnter={goToNextStep}
                  />
                </StepContainer>
              )}
            </div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default App;

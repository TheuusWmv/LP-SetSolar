import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQsProps {
  items?: FAQItemData[];
  title?: string;
  subtitle?: string;
  badge?: string;
  supportLink?: string;
  supportText?: string;
}

const defaultFaqItems: FAQItemData[] = [
  {
    id: "item-1",
    question: "Quanto tempo leva para a usina solar ser instalada e ativada?",
    answer:
      "A instalação física dos módulos e inversores em uma residência leva de 1 a 3 dias úteis. Para empresas de médio porte, de 3 a 7 dias úteis. O prazo total até a troca do medidor pela concessionária varia entre 15 e 30 dias, e nossa equipe conduz 100% da tramitação burocrática.",
    category: "Instalação",
  },
  {
    id: "item-2",
    question: "Qual é o tempo médio de retorno do investimento (payback)?",
    answer:
      "Para a grande maioria dos clientes residenciais e comerciais, o retorno completo do investimento ocorre entre 2,5 e 4 anos. Como os equipamentos possuem vida útil garantida superior a 25 anos, você desfruta de mais de 20 anos de energia praticamente gratuita.",
    category: "Financeiro",
  },
  {
    id: "item-3",
    question: "Como funciona a geração em dias nublados, chuvosos ou à noite?",
    answer:
      "Os painéis operam através da radiação solar (luz), e não pelo calor. Por isso, continuam gerando eletricidade em dias nublados e chuvosos (em menor intensidade). À noite, você consome normalmente a energia da rede pública ou utiliza os créditos acumulados durante o dia pelo sistema On-Grid.",
    category: "Técnico",
  },
  {
    id: "item-4",
    question: "Posso parcelar ou financiar a instalação do sistema solar?",
    answer:
      "Sim! Temos parceria com os principais bancos (Santander, BV, Sicredi, Sicoob, Banco do Brasil e BNDES) com taxas a partir de 0,79% ao mês e até 120 dias de carência. Na maioria dos casos, o valor que você economiza na conta de luz é suficiente para pagar a parcela do financiamento.",
    category: "Financeiro",
  },
  {
    id: "item-5",
    question: "Qual manutenção os painéis solares exigem ao longo dos anos?",
    answer:
      "A manutenção é mínima. Os painéis recebem revestimento antiaderente que se autolimpa com a água da chuva. Recomendamos apenas uma lavagem simples semestral caso haja acúmulo de poeira e uma inspeção elétrica anual, serviço que oferecemos com nossa equipe de suporte.",
    category: "Manutenção",
  },
  {
    id: "item-6",
    question: "O que acontece se faltar luz na rede pública da concessionária?",
    answer:
      "Por normas de segurança da ANEEL (anti-ilhamento), os sistemas conectados à rede (On-Grid tradicionais) se desligam automaticamente para proteger eletricistas da rede em reparos. Se você deseja ter energia garantida durante apagões, oferecemos sistemas híbridos com bancos de baterias de lítio.",
    category: "Técnico",
  },
];

export const BlurredStagger = ({
  text = "",
}: {
  text: string;
}) => {
  return (
    <div className="w-full">
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        className="text-xs sm:text-sm text-slate-600 leading-relaxed"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default function FAQs({
  items = defaultFaqItems,
  title = "Perguntas frequentes",
  subtitle = "Tudo o que você precisa saber sobre instalação, homologação, economia e garantias do seu sistema solar.",
  badge = "FAQ Sollux",
  supportLink = "#",
  supportText = "Falar com nosso time de engenharia",
}: FAQsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {badge && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5c900]" />
                  <span>{badge}</span>
                </div>
              )}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-[1.15]">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground text-slate-600 mt-4 text-balance text-base sm:text-lg leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <p className="text-slate-600 text-sm">
                Não encontrou a resposta que procurava? Entre em contato com nossos especialistas.
              </p>
              <a
                href={supportLink}
                className="inline-flex items-center gap-1.5 text-neutral-950 font-bold text-sm mt-3 hover:text-[var(--brand-accent-hover)] transition-colors"
              >
                <span>{supportText}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Coluna Direita (Accordion com BlurredStagger) */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible defaultValue={items[0]?.id} className="w-full space-y-3">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-2xl border border-slate-200/80 bg-white px-5 sm:px-6 transition-all duration-200 hover:border-slate-300 data-[state=open]:border-neutral-900/40 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer py-5 text-left text-base sm:text-lg font-bold text-neutral-900 hover:no-underline group">
                    <div className="flex items-start gap-3.5 text-left pr-2">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-slate-400 mt-0.5">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <span className="group-hover:text-neutral-950 transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-1 text-slate-600 pl-7 sm:pl-8">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

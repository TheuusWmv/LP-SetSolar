import { templateData } from "../data/templateData";
import { BlurReveal } from "./ui/blur-reveal";

export function SolarGuide() {
  const { company } = templateData;
  return (
    <section
      id="guia-energia-solar"
      aria-labelledby="solar-guide-title"
      className="py-12 sm:py-16 bg-slate-50 border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurReveal
          as="h2"
          id="solar-guide-title"
          className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight"
        >
          Energia solar em {company.city}: como escolher seu projeto?
        </BlurReveal>
        <BlurReveal className="mt-5 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
          <p>
            {company.name} atende {company.regionCovered}. Para solicitar um
            orçamento, informe seu consumo mensal em kWh, envie uma conta de
            energia e indique o endereço de instalação. Um sistema fotovoltaico
            transforma a luz do sol em eletricidade. Para escolher o projeto,
            avalie seu consumo, a área disponível e se precisa de energia de
            reserva durante apagões. A proposta deve explicar os equipamentos, a
            geração estimada e as condições de instalação.
          </p>
        </BlurReveal>
        <BlurReveal className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm text-slate-600">
            <caption className="p-4 text-left font-semibold text-neutral-900">
              Compare o objetivo de cada solução
            </caption>
            <thead className="bg-slate-100 text-neutral-900">
              <tr>
                <th scope="col" className="p-4">
                  Solução
                </th>
                <th scope="col" className="p-4">
                  Objetivo
                </th>
                <th scope="col" className="p-4">
                  O que avaliar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <th scope="row" className="p-4 font-semibold">
                  Solar conectado à rede
                </th>
                <td className="p-4">
                  Gerar energia para reduzir o consumo faturado pela
                  distribuidora.
                </td>
                <td className="p-4">
                  Consumo, geração estimada e condições de conexão.
                </td>
              </tr>
              <tr>
                <th scope="row" className="p-4 font-semibold">
                  Solar com baterias e backup
                </th>
                <td className="p-4">
                  Também atender equipamentos selecionados durante falhas da
                  rede.
                </td>
                <td className="p-4">
                  Potência dos equipamentos, capacidade das baterias e autonomia
                  prevista.
                </td>
              </tr>
            </tbody>
          </table>
        </BlurReveal>
        <BlurReveal className="mt-8 grid gap-6 sm:grid-cols-2 text-sm leading-relaxed text-slate-600">
          <div>
            <h3 className="font-bold text-base text-neutral-900 mb-2">
              O que define o investimento?
            </h3>
            <p>
              O valor depende do consumo, dos equipamentos e da instalação.
              Compare propostas com as mesmas premissas e peça uma estimativa de
              retorno. A ANEEL informa que não define preços de equipamentos nem
              condições de financiamento.
            </p>
            <a
              className="inline-block mt-3 underline underline-offset-4 text-neutral-900"
              href="https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida"
            >
              Consultar orientações da ANEEL sobre geração distribuída
            </a>
          </div>
          <div>
            <h3 className="font-bold text-base text-neutral-900 mb-2">
              Como conferir os equipamentos?
            </h3>
            <p>
              Peça a identificação dos modelos, as condições de garantia e a
              documentação técnica. O Inmetro orienta consultar sua base de
              registros para verificar equipamentos fotovoltaicos.
            </p>
            <a
              className="inline-block mt-3 underline underline-offset-4 text-neutral-900"
              href="https://www.gov.br/inmetro/pt-br/acesso-a-informacao/perguntas-frequentes/avaliacao-da-conformidade/sistemas-e-equipamentos-para-energia-fotovoltaica/como-saber-se-um-equipamento-para-energia-fotovoltaica-ja-esta-registrado"
            >
              Ver como consultar registros no Inmetro
            </a>
          </div>
        </BlurReveal>
        <p className="mt-6 text-xs text-slate-500">
          Conteúdo informativo revisado em{" "}
          <time dateTime="2026-10-07">07/10/2026</time>. A viabilidade e a
          economia dependem da análise de cada projeto.
        </p>
      </div>
    </section>
  );
}

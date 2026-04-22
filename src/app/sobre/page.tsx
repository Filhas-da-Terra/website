import { OdsSection } from '@/components/sobre/ods-section'

export default function About() {
  return (
    <div className='page-container'>
      <main className="bg-[url('https://nkualykoqttmxfbhydav.supabase.co/storage/v1/object/public/filhasDaTerra/ondas.png')] bg-cover bg-no-repeat bg-center relative">
        {/* Overlay for better contrast */}
        <div className='absolute inset-0 bg-white/90'></div>
        <div className='container mx-auto p-4 relative z-10'>
          <section className='my-12 animate-fade-down animate-duration-1000'>
            <h2 className='text-3xl font-bold text-black'>Quem Somos</h2>
            <p className='text-lg text-black mt-4'>
              O Instituto Filhas da Terra surgiu em 2018 como Coletiva Filhas da
              Terra e foi formalizado em 2024. Desde sua criação, a associação
              sem fins lucrativos é impulsionada por jovens mulheres
              periféricas, inseridas em um contexto de desigualdade ambiental e
              vulnerabilidade socioeconômica. Nosso objetivo é promover o
              conhecimento e a responsabilidade ambiental nas comunidades de
              Ceilândia (RA–IX) e Sol Nascente e Pôr do Sol (RA-XXXII), ocupando
              espaços públicos para criar ambientes de diálogo com a infância e
              juventude por meio da cultura periférica e questões
              socioambientais. Realizamos pesquisas, oficinas, palestras,
              atividades formativas e rodas de conversa sobre temas como meio
              ambiente, soberania alimentar, agroecologia, cultura negra,
              indígena e quilombola, saúde, reutilização de materiais
              recicláveis, autocuidado, economia solidária/criativa, alimentação
              saudável, arte, esporte e cultura.
            </p>
          </section>
          <section className='my-12 animate-fade-down animate-duration-1000 animate-delay-[500ms]'>
            <h3 className='text-2xl font-bold text-black'>
              Estrutura da Organização
            </h3>
            <p className='text-lg text-black mt-4'>
              Atualmente, a organização é estruturada em 5 diretorias:
              administrativo, socioambiental, saúde, cultura e comunicação,
              sendo majoritariamente composta por mulheres negras, LGBTQIAPN+ e
              uma pessoa com deficiência. Os processos decisórios são tomados de
              forma participativa e coletiva.
            </p>
          </section>
          <section className='my-12 animate-fade-down animate-duration-1000 animate-delay-[1000ms]'>
            <h3 className='text-2xl font-bold text-black'>
              Articulação em Rede de Parcerias
            </h3>
            <p className='text-lg text-black mt-4'>
              Atuamos de forma descentralizada, com ações em espaços como a Casa
              da Natureza, Ela Fav Mob e Jovem de Expressão. Estamos em parceria
              com Mulheres do Sol e Floresta da Nasaré, planejando hortas
              comunitárias com a Universidade de Brasília, Universidade Federal
              do Rio Grande do Norte, EMATER e o Ministério do Desenvolvimento
              Agrário e Agricultura Familiar. Desenvolvemos projetos nacionais,
              como o Programa Periferia Sem Risco, em parceria com a Secretaria
              Nacional de Periferias, Universidade de Brasília, FioCruz e
              movimentos sociais. Também colaboramos com escolas, organizações e
              empresas como Engaja Mundo, Impact HUB, Rede Globo Brasília,
              TikTok, União Europeia e L’Oréal Paris.
            </p>
          </section>
          <section className='my-12 animate-fade-down animate-duration-1000 animate-delay-[1500ms]'>
            <h3 className='text-2xl font-bold text-black'>Missão</h3>
            <p className='text-lg text-black mt-4'>
              Promover a justiça social e ambiental nas áreas periféricas do
              Distrito Federal, fortalecendo a autonomia e a voz de mulheres
              negras e pessoas LGBTQIAPN+ por meio de ações educativas,
              culturais e de mobilização comunitária. Trabalhamos para preservar
              o bioma do cerrado, promovendo soluções inteligentes para o
              desenvolvimento socioambiental e respeitando os saberes
              tradicionais aliados ao conhecimento científico.
            </p>
          </section>
          <section className='my-12 animate-fade-down animate-duration-1000 animate-delay-[2000ms]'>
            <h3 className='text-2xl font-bold text-black'>Visão</h3>
            <p className='text-lg text-black mt-4'>
              Ser um instituto referência na promoção da equidade e
              sustentabilidade no cerrado, onde mulheres negras e pessoas
              LGBTQIAPN+ tenham acesso a recursos, conhecimento e espaços de
              protagonismo, contribuindo para a transformação social e ambiental
              das suas comunidades. Preservar o bioma, fauna, flora, nascentes e
              rios locais é essencial para garantir o abastecimento de água
              potável em âmbito nacional e mundial.
            </p>
          </section>
          <OdsSection />
        </div>
      </main>
    </div>
  )
}

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const projetos = [
  {
    titulo: 'Programa Periferia Sem Risco',
    descricao:
      'Projeto nacional em parceria com a Secretaria Nacional de Periferias, UnB, Fiocruz e movimentos sociais para mitigar riscos nas periferias urbanas.',
    imagem: '/periferia.jpg',
  },
  {
    titulo: 'Hortas Comunitárias',
    descricao:
      'Em parceria com Mulheres do Sol, Floresta da Nasaré, UnB, UFRN, EMATER e o Ministério do Desenvolvimento Agrário e Agricultura Familiar.',
    imagem: '/horta.jpg',
  },
  {
    titulo: 'Mediação Jogo do Rio Melchior',
    descricao:
      'Projeto de despoluição do rio Melchior.',
    imagem: '/jogo.jpeg',
  },
  {
    titulo: 'Intervenção artística " território em transito: sonho de morar"',
    descricao:
      'Intervenção artística em parceria com o  Centro Universitário de Brasília.',
    imagem: '/intervencao.jpeg',
    },
    {
    titulo: 'Evento socioambiental ocupa lagoinha',
    descricao:
      'Evento socioambiental.',
    imagem: '/evento.jpeg',
    }
]

export default function ProjetosPage() {
  return (
    <main className='max-w-5xl mx-auto px-4 py-10 space-y-8'>
      <section>
        <h1 className='text-4xl font-bold text-green-800'>Nossos Projetos</h1>
        <p className='text-lg text-muted-foreground mt-2'>
          Conheça algumas das iniciativas desenvolvidas pelo Instituto Filhas da
          Terra para promover justiça socioambiental nas periferias do DF.
        </p>
      </section>

      <Separator />

      <section className='grid md:grid-cols-2 gap-6 animate-fade-down animate-duration-1000'>
        {projetos.map((projeto, index) => (
          <Card key={index} className='rounded-2xl shadow-md'>
            <Image
              width={500}
              height={300}
              src={projeto.imagem}
              alt={projeto.titulo}
              className='w-full h-48 object-cover rounded-t-2xl'
            />
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold text-green-700'>
                {projeto.titulo}
              </h2>
              <p className='mt-2 text-muted-foreground'>{projeto.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator />

      <section>
        <h2 className='text-2xl font-bold text-green-800'>Áreas de Atuação</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
          {[
            'Ação Complementar à Escola',
            'Economia Solidária',
            'Formação Profissional',
            'Práticas Esportivas',
            'Promoção da Cultura',
            'Ciência e Tecnologia',
            'Comunicação',
            'Cultura e Artes',
            'Defesa de Direitos',
            'Desenvolvimento Comunitário',
            'Educação',
            'Esportes',
            'Formação para o Trabalho',
            'Meio Ambiente',
            'Saúde',
            'Educação Não Formal',
            'Qualidade de Vida',
          ].map((area, index) => (
            <span
              key={index}
              className='text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full text-center font-medium'
            >
              {area}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}

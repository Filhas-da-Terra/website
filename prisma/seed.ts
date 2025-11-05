import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding content items...')

  const contentItems = [
    {
      title: 'Jardim do Bioma Cerrado recebe novas espécies nativas',
      description: 'Plantio de espécies nativas do Cerrado',
      content:
        'Iniciativa de plantio de 70 mudas de espécies nativas do Cerrado na sede do Ibama, promovendo a refloração e refaunação em celebração ao Dia do Cerrado e Dia da Árvore.',
      category: 'Documento',
      icon: 'FileText',
      link: '/novas-especies.pdf',
      linkText: 'Visualizar',
    },
    {
      title: 'Cadastro de Voluntários',
      description: 'Junte-se ao Instituto Filhas da Terra',
      content:
        'Faça parte da nossa rede de voluntários e contribua com a justiça socioambiental no DF.',
      category: 'Cadastro',
      icon: 'Users',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSfsz2uX5EtdUm0K4mjZQJXKmPgDC8WTZTIGcySCG19yHjr57w/viewform?pli=1',
      linkText: 'Cadastrar',
    },
    {
      title: 'Criação do Parque Ecológico e Despoluição do Rio Melchior',
      description: 'Luta pela preservação do Rio Melchior',
      content:
        'Petição para criação de parque ecológico e despoluição do Rio Melchior no Distrito Federal.',
      category: 'Petição',
      icon: 'AlertTriangle',
      link: 'https://secure.avaaz.org/community_petitions/po/coletivo_filhas_da_terra_queremos_um_parque_ecologico_na_ceilandia_e_a_despoluicao_do_rio_melchior_urgente/?fpla',
      linkText: 'Assinar',
    },
    {
      title: 'Racismo Ambiental e a poluição do Rio Melchior',
      description: 'Pesquisa acadêmica sobre justiça ambiental',
      content:
        'A pesquisa tem como propósito relacionar racismo ambiental e a realidade da população próxima ao Rio Melchior/Belchior, fazendo um eco história de como foi o processo de construção das periferias que fazem parte do território.',
      category: 'Documento',
      icon: 'FileText',
      link: 'https://bdm.unb.br/handle/10483/37840',
      linkText: 'Ler',
    },
    {
      title: 'Portfólio',
      description: 'Projetos e iniciativas do Instituto',
      content:
        'Conheça os projetos desenvolvidos pelo Instituto Filhas da Terra e seus impactos.',
      category: 'Portfólio',
      icon: 'FileCheck',
      link: 'https://www.canva.com/design/DAE_B0rrBSY/xl-B3z7BQ26IN7pIbDy1Fg/edit?utm_content=DAE_B0rrBSY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      linkText: 'Ver Portfólio',
    },
    {
      title: 'Ocupa Lagoinha: Movimentos emergentes de resiliência',
      description: 'Pesquisa sobre movimentos de resistência',
      content:
        'Movimento de resistência pela efetivação das políticas de proteção de nascentes no Distrito Federal.',
      category: 'Documento',
      icon: 'FileText',
      link: 'https://publicacoes.amigosdanatureza.org.br/index.php/anap/en/article/view/4152/3992',
      linkText: 'Conhecer',
    },
    {
      title: 'A Luta Continua - Parte 2',
      description: 'Videoclipe musical de resistência',
      content:
        'Videoclipe musical que expressa a resistência e luta por justiça socioambiental.',
      category: 'Videoclipe',
      icon: 'Music',
      link: 'https://youtu.be/PfDdPw_LfGA?si=RAVDz3jggsHrgHlM',
      linkText: 'Assistir',
    },
    {
      title: 'O Colapso dos Rios do DF',
      description: 'Seminário sobre crise hídrica',
      content:
        'Documentário que retrata a situação crítica dos rios e nascentes no Distrito Federal.',
      category: 'Seminário',
      icon: 'Globe',
      link: 'https://youtu.be/sYZWI92OcGs',
      linkText: 'Assistir',
    },
    {
      title: 'Seminário Ambiental',
      description: 'Discussão sobre questões ambientais',
      content:
        'Seminário para discussão de questões ambientais e propostas de soluções sustentáveis.',
      category: 'Seminário',
      icon: 'Globe',
      link: 'https://youtu.be/LyNE8xCNjz4',
      linkText: 'Participar',
    },
    {
      title:
        'Notícias de Lugar Nenhum: Os bens comuns no Brasil e os desafios às margens do direito',
      description:
        'Reportagem sobre os bens comuns no Brasil e o trabalho do Instituto Filhas da Terra',
      content:
        'Artigo da Labsus sobre os bens comuns no Brasil que menciona o trabalho do Instituto Filhas da Terra na defesa de nascentes e na luta pela justiça socioambiental.',
      category: 'Documento',
      icon: 'FileText',
      link: 'https://www.labsus.org/2024/11/noticias-de-lugar-nenhum/',
      linkText: 'Ler publicação',
    },
    {
      title:
        'Plano comunitário de redução de riscos e adaptação climática: Sol Nascente – trechos II e III',
      description:
        'Análise e mapeamento de situações de risco e proposições junto com a comunidade, com aplicação de Soluções Baseadas na Natureza, por meio da comunidade como agente ativo e transformador.',
      content:
        'Documento disponível no Portal de Livros da UnB em parceria com o Instituto Filhas da Terra.',
      category: 'Documento',
      icon: 'FileText',
      link: 'https://livros.unb.br/index.php/portal/catalog/view/678/918/8685',
      linkText: 'Acessar documento',
    },
    {
      title: 'Cadernos: Observatório Brasileiro de Hábitos Alimentares',
      description:
        'Cardernos OBHA Volume 1 | Número 4 | Setembro de 2023 | Revista Bimestral ISSN 2763-8324',
      content: 'Entrevistando a Coletiva Filhas da Terra – Casa da Natureza',
      category: 'Reportagem',
      icon: 'Newspaper',
      link: 'https://drive.google.com/file/d/1Q2HfVUfDYL4l0gYOh1TW4ZVBAuHguYRh/view',
      linkText: 'Ler reportagem',
    },
    {
      title:
        'Projeto de termelétrica em Brasília e PL da Devastação colocam o Cerrado em risco',
      description:
        'Reportagem sobre a resistência popular à UTE Brasília e os riscos do PL da Devastação',
      content:
        'Reportagem sobre a tentativa de instalação da Usina Termelétrica (UTE) Brasília em Samambaia e os impactos do PL da Devastação, com menção à presidenta do Instituto Filhas da Terra, Larissa Cordeiro.',
      category: 'Reportagem',
      icon: 'Newspaper',
      link: 'https://www.brasildefato.com.br/2025/07/02/projeto-de-termeletrica-em-brasilia-e-pl-da-devastacao-colocam-o-cerrado-em-risco/',
      linkText: 'Ler reportagem',
    },
    {
      title:
        'Decisão judicial interrompe derrubada na Fazendinha do Sol Nascente',
      description:
        'Decisão judicial suspende operação do DF Legal na Fazendinha do Sol Nascente',
      content:
        'Reportagem sobre a decisão judicial que interrompeu a derrubada de muros e construções na Fazendinha do Sol Nascente, em área de preservação permanente.',
      category: 'Reportagem',
      icon: 'Newspaper',
      link: 'https://www.correiobraziliense.com.br/cidades-df/2025/07/7208374-decisao-judicial-interrompe-derrubada-na-fazendinha-do-sol-nascente.html?utm_source=chatgpt.com',
      linkText: 'Ler reportagem',
    },
    {
      title:
        'Justiça do DF suspende derrubadas de casas em comunidade no Sol Nascente',
      description:
        'Decisão judicial protege comunidade do Sol Nascente contra remoções forçadas',
      content:
        'Reportagem sobre a decisão da Justiça do Distrito Federal que suspendeu as derrubadas de casas na comunidade do Sol Nascente.',
      category: 'Reportagem',
      icon: 'Newspaper',
      link: 'https://www.brasildefato.com.br/2025/07/23/justica-do-df-suspende-derrubadas-de-casas-em-comunidade-no-sol-nascente/',
      linkText: 'Ler reportagem',
    },
  ]

  for (const item of contentItems) {
    // Check if item already exists by link
    const existing = await prisma.content.findFirst({
      where: {
        link: item.link,
      },
    })

    if (existing) {
      await prisma.content.update({
        where: { id: existing.id },
        data: item,
      })
      console.log(`Updated: ${item.title}`)
    } else {
      await prisma.content.create({
        data: item,
      })
      console.log(`Created: ${item.title}`)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

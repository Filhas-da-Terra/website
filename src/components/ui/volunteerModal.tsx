'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface VolunteerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function VolunteerModal({
  open,
  onOpenChange,
}: VolunteerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0'>
        <button
          onClick={() => onOpenChange(false)}
          className='absolute right-4 top-4 z-20 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Fechar</span>
        </button>

        <div className='bg-gradient-to-b from-[#2E4D3D] to-[#1a3025] p-6 text-center'>
          <h2 className='text-3xl font-bold text-white'>Juventudes da Terra</h2>
          <p className='text-white font-semibold text-lg mt-1'>
            Voluntariado em Agroecologia Urbana e Justiça Climática
          </p>
        </div>

        <div className='p-6 space-y-4'>
          <p className='text-center text-gray-700 dark:text-gray-300 text-lg font-medium'>
            O futuro do território também depende de você.
          </p>

          <div className='bg-[#F2F2F2] dark:bg-[#1a1a1a] p-4 rounded-lg'>
            <p className='text-gray-700 dark:text-gray-300'>
              Você acredita que os jovens podem transformar suas comunidades?
              <br />
              <span className='font-semibold'>Nós também.</span>
            </p>
          </div>

          <p className='text-gray-700 dark:text-gray-300'>
            Por isso, o{' '}
            <span className='font-bold text-[#2E4D3D] dark:text-[#4CAF50]'>
              Instituto Filhas da Terra
            </span>{' '}
            está selecionando{' '}
            <span className='font-bold'>20 jovens de 16 a 29 anos</span> para
            participar do projeto{' '}
            <span className='font-semibold'>
              Juventudes da Terra: Voluntariado em Agroecologia Urbana e Justiça
              Climática
            </span>
            , uma iniciativa do Programa Juventude Solidária.
          </p>

          <p className='text-gray-700 dark:text-gray-300'>
            Esta é uma oportunidade para quem quer aprender, fazer novas
            conexões, desenvolver habilidades e participar de ações que geram
            impacto real em Ceilândia, Sol Nascente e Pôr do Sol.
          </p>

          <div className='bg-[#F5C518]/10 border-l-4 border-[#F5C518] p-4 rounded-r-lg'>
            <h3 className='font-bold text-[#2E4D3D] dark:text-[#4CAF50]'>
              O que você vai viver durante o projeto?
            </h3>
            <ul className='list-none space-y-1 mt-2 text-gray-700 dark:text-gray-300'>
              <li>🌿 Formação em agroecologia urbana</li>
              <li>🌎 Educação ambiental e justiça climática</li>
              <li>🎥 Comunicação popular e produção de conteúdo</li>
              <li>🤝 Liderança e trabalho em equipe</li>
              <li>
                🌱 Mutirões ambientais e fortalecimento de hortas comunitárias
              </li>
              <li>
                ✨ Certificação e uma experiência que fará diferença na sua
                trajetória pessoal, acadêmica e profissional.
              </li>
            </ul>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-[#2E4D3D]/10 dark:bg-[#2E4D3D]/20 p-4 rounded-lg'>
              <h4 className='font-bold text-[#2E4D3D] dark:text-[#4CAF50]'>
                Quem pode participar?
              </h4>
              <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mt-1'>
                <li>Jovens de 16 a 29 anos</li>
                <li>Não precisa ter experiência</li>
                <li>
                  Basta ter vontade de aprender, participar e construir soluções
                  para o território
                </li>
              </ul>
            </div>
            <div className='bg-[#F5C518]/10 p-4 rounded-lg'>
              <h4 className='font-bold text-[#2E4D3D] dark:text-[#F5C518]'>
                E sobre a bolsa?
              </h4>
              <p className='text-sm text-gray-700 dark:text-gray-300 mt-1'>
                O projeto oferece <span className='font-bold'>20 vagas</span>.
                <br />
                <span className='text-xs'>
                  De acordo com as regras do Programa Juventude Solidária,{' '}
                  <span className='font-semibold'>até cinco participantes</span>{' '}
                  que atenderem aos critérios de elegibilidade, incluindo
                  possuir ID Jovem válido, poderão receber uma bolsa de{' '}
                  <span className='font-bold'>R$300</span> durante a execução do
                  projeto.
                </span>
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 italic'>
                Mas o maior ganho vai muito além da bolsa.
              </p>
            </div>
          </div>

          <div className='bg-[#2E4D3D] p-4 rounded-lg text-white text-center'>
            <p className='font-medium'>
              Você fará parte de uma rede de jovens comprometidos com a
              transformação social e ambiental, adquirirá novos conhecimentos e
              desenvolverá competências que poderão abrir portas para o futuro.
            </p>
          </div>

          <div className='text-center'>
            <p className='text-lg font-bold text-[#2E4D3D] dark:text-[#4CAF50]'>
              🌍 Seu território precisa da sua participação.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              As mudanças que queremos ver começam com pessoas dispostas a agir.
              <br />
              Essa pode ser a oportunidade que você estava esperando para
              aprender, crescer e fazer a diferença.
            </p>
          </div>

          <div className='border-2 p-4 rounded-lg text-center'>
            <p className='font-bold text-gray-700 dark:text-gray-300 text-lg'>
              📅 Inscrições abertas até 27 de julho.
            </p>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Não deixe para a última hora. Garanta sua vaga e venha construir
              um futuro mais justo, sustentável e coletivo com o Instituto
              Filhas da Terra.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700'>
            <a
              href='https://brasilparticipativo.presidencia.gov.br/processes/juventudesolidaria/f/3785/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center px-8 py-3 bg-[#2E4D3D] text-white rounded-lg hover:bg-[#1a3025] transition-colors font-medium shadow-lg hover:shadow-xl w-full sm:w-auto text-lg'
            >
              Quero me inscrever
            </a>
            <button
              onClick={() => onOpenChange(false)}
              className='inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium w-full sm:w-auto'
            >
              Fechar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

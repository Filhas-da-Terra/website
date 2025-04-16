import Link from "next/link";

export default function Transparencia() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className='text-2xl font-bold'>Prestação de Contas</h1>
      <p>
        Veja aqui os relatórios financeiros, atividades e documentos da
        instituição.
      </p>
      <ul className='list-disc pl-6'>
        <li>
          <Link href='/Instituto Filhas da Terra - Estatuto Social 08.09.2023 (v.registrada).pdf' className='text-purple-700 underline'>
            Estatuto Social
          </Link>
        </li>
      </ul>
    </div>
  )
}

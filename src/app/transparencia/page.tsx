export default function Transparencia() {
    return (
       <div>
       <h1 className="text-2xl font-bold">Prestação de Contas</h1>
        <p>Veja aqui os relatórios financeiros, atividades e documentos da instituição.</p>
        <ul className="list-disc pl-6">
          <li><a href="/docs/relatorio2024.pdf" className="text-purple-700 underline">Relatório Anual 2024</a></li>
          <li><a href="/docs/balanco2024.pdf" className="text-purple-700 underline">Balanço Financeiro</a></li>
        </ul>
       </div>
    );
}

import { Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#4c1d95] text-white">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center mb-2">
            <Image src="/logoBranca.png" alt="Logo" width={50} height={50} className='mr-4' />
            <h4 className="text-lg font-semibold">Instituto Filhas da Terra</h4>
          </div>
          <p>
            Organização sem fins lucrativos com atuação em Ceilândia e Sol Nascente, promovendo justiça
            socioambiental com foco em mulheres negras e pessoas LGBTQIAPN+.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Contato</h4>
          <p>Email: contato@filhasdaterra.org</p>
          <p>Ceilândia, DF</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Redes Sociais</h4>
          <div className="flex space-x-4 mt-2">
            <a href="https://instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 hover:text-[#fefae0]" />
            </a>
            <a href="https://facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5 hover:text-[#fefae0]" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#92400e] text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Instituto Filhas da Terra. Todos os direitos reservados.
      </div>
    </footer>
  );
}

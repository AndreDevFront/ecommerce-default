import { CreditCard, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import styles from "./footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <span className={styles.brand}>Velas.co</span>
            <p className={styles.description}>
              Nossa missão é trazer qualidade e sofisticação para o seu dia a
              dia. Produtos selecionados com carinho para você.
            </p>
            <div className={styles.socialLinks}>
              <Link href="#" className={styles.socialIcon}>
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FaTwitter size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Loja</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/" className={styles.link}>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/products" className={styles.link}>
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Suporte</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/help" className={styles.link}>
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/policy/returns" className={styles.link}>
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy" className={styles.link}>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/policy/terms" className={styles.link}>
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Atendimento</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <MapPin className={styles.icon} size={18} />
                <span>
                  Rua das Flores, 123 - Centro <br /> São Paulo - SP
                </span>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.icon} size={18} />
                <a href="mailto:contato@velas.co" className={styles.link}>
                  contato@velas.co
                </a>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.icon} size={18} />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.bottomSection}>
          <div className={styles.legalInfo}>
            <p>
              <strong>Razão Social:</strong> VELAS ARTE E DECORACAO LTDA
            </p>
            <p>
              <strong>CNPJ:</strong> 12.345.678/0001-90
            </p>
            <p>Rua das Flores, 123 - Centro, São Paulo - SP, CEP 01000-000</p>
          </div>

          <div className={styles.bottomBar}>
            <p className={styles.copyright}>
              © {currentYear} Velas.co. Todos os direitos reservados.
            </p>

            <div className={styles.paymentMethods}>
              <div className={styles.paymentBadge}>
                <CreditCard size={14} /> Cartão
              </div>
              <div className={styles.paymentBadge}>Pix</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

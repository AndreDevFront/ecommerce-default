import { CreditCard, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
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
                <Link href="/produtos" className={styles.link}>
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className={styles.link}>
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/contato" className={styles.link}>
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Suporte</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/ajuda" className={styles.link}>
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/trocas" className={styles.link}>
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className={styles.link}>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className={styles.link}>
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Atendimento</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <MapPin className={styles.icon} />
                <span>
                  Rua Exemplo, 123 <br /> São Paulo - SP
                </span>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.icon} />
                <span>contato@velas.co</span>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.icon} />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.bottomBar}>
          <p>© 2026 Velas.co. Todos os direitos reservados.</p>

          <div className={styles.paymentMethods}>
            <span className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" /> Cartão
            </span>
            <span className={styles.paymentDivider}></span>
            <span>Pix</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

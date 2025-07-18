import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Servicios</h4>
            <ul>
              <li>
                <a href="#auditoria">Auditoría Ambiental</a>
              </li>
              <li>
                <a href="#consultoria">Sobre Nosotros</a>
              </li>
              <li>
                <a href="#capacitacion">Paquetes</a>
              </li>
              
            </ul>
          </div>

          <div className="footer-column">
            <h4>Certificaciones</h4>
            <ul>
              <li>
                <a href="#iso14001">Certificaciones disponibles</a>
              </li>
              <li>
                <a href="https://www.ict.go.cr/es/sostenibilidad/bandera-azul.html">Bandera Azul</a>
              </li>
              <li>
                <a href="https://cambioclimatico.minae.go.cr/programa-pais-carbono-neutralidad/">Carbono Neutral</a>
              </li>
              <li>
                <a href="https://www.esencialcostarica.com/quienes-somos/">Esencial Costa Rica</a>
              </li>
            </ul>
          </div>

         

          <div className="footer-column">
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href="#telefono">+1 234 567 8900</a>
              </li>
              <li>
                <a href="#email">info@greenon.com</a>
              </li>
              <li>
                <a href="#direccion">123 Green Street</a>
              </li>
              <li>
                <a href="#horarios">Lun - Vie 9:00-18:00</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          
          <div className="footer-logo">
            <span>Green On</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

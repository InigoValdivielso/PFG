import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const handleButtonClick = () => {
    navigate("/prerequisites");
  };
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <script src="../js/bootstrap.bundle.min.js" />
        <script src="../js/jflickrfeed.min.js" />
        <script src="../js/jquery-3.4.1.min.js" />
        <script src="../js/lazysizes.min.js" />
        <script src="../js/main.js" />
        <script src="../js/own.carousel.min.js" />
        <script src="../js/scripts.min.js" />
      </Helmet>
      <div className="cabecera">
        <div className="cabeceraPrograma">
          <div className="container">
            <nav className="caminoMigas">
              <ul>
                <li>
                  <a href="http://www.deusto.es/">Home</a>
                </li>
                <li>
                  <a href="/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme">
                    Estudia
                  </a>
                </li>
                <li>
                  <a href="/es/inicio/estudia/estudios">Estudios</a>
                </li>
                <li>
                  <a href="/es/inicio/estudia/estudios/executive-education">
                    Executive education
                  </a>
                </li>
                <li>
                  <span>Programa Transformación Digital para la PYME</span>
                </li>
              </ul>
            </nav>
            <div className="tituloCabecera">
              <h1 style={{ color: "black" }}>
                Programa Transformación Digital para la PYME
                <span>EDICIÓN 2025 - MATRICULACIÓN ABIERTA</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="exploraSeccion plegado">
        <div className="container">
          <div className="exploraBox">
            <h2 className="explora">
              <img
                src="https://www.deusto.es/estaticos/ud/img/cerrarModal.svg"
                alt="Cerrar explora esta secciÃ³n"
                className=""
              />
              <img
                className="mostrar"
                src="https://www.deusto.es/estaticos/ud/img/hamburguesaSeccion.svg"
                alt="Hamburguesa explora esta secciÃ³n"
              />
              MENÚ <span>/ Sobre el Programa</span>
            </h2>
          </div>
          <div className="exploraSeccionesN2" style={{ display: "none" }}>
            <div className="exploraContenido">
              <div className="container">
                <div className="row" style={{ minHeight: 287 }}>
                  <div className="enlacesSeccion">
                    <div className="subpaginasSeccion">
                      <ul>
                        <li>
                          <a
                            href="/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme"
                            title="Sobre el Programa"
                            className="seccion-1 seccionActiva"
                          >
                            Sobre el Programa
                          </a>
                          <ul
                            className="subSeccion-1 seccionActiva"
                            style={{ minHeight: 287 }}
                          >
                            <li>
                              <a href="#programa-gratuito">Programa Gratuito</a>
                            </li>
                            <li>
                              <a href="#perfil-participante">Dirigido a</a>
                            </li>
                            <li>
                              <a href="#beneficios">
                                ¿Qué obtienes con el programa?
                              </a>
                            </li>
                            <li>
                              <a href="#metodo">
                                El método de Deusto Business School
                              </a>
                            </li>
                            <li>
                              <a href="#cotenido">Contenido del Programa</a>
                            </li>
                            <li>
                              <a href="#inscripcion">Proceso de inscripción</a>
                            </li>
                            <li>
                              <a href="#mas-informacion">Más Información</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="botonesSeccion" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="contents">
        <div className="sobreGrado">
          <div className="container">
            <div className="row">
              <div className="descrInfoGrado col-lg-8">
                <div className="tituloSeccion">
                  <h2>
                    La hoja de ruta para una digitalización global y efectiva
                  </h2>
                </div>
                <p>
                  ¿Sabes que la
                  <strong>integración de las tecnologías digitales</strong> (big
                  data, inteligencia artificial, marketing digital…) puede
                  ayudarte a&nbsp;
                  <strong>aumentar significativamente la competitividad</strong>
                  &nbsp;de tu empresa?
                </p>
                <p>
                  Si tienes interés en accionar la palanca de la digitalización
                  y diseñar una&nbsp;estrategia a medida para tu organización,
                  el nuevo
                  <strong>
                    programa de Transformación Digital para la PYME
                  </strong>
                  está hecho para ti.
                </p>
                <p>
                  Este es un programa
                  <strong>
                    financiado por la Unión Europea Next Generation EU | Plan de
                    Recuperación y Resiliencia del Gobierno de España.
                  </strong>
                </p>
                <div className="row">
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/calendario.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/calendario.svg"
                    />
                    <h3>Cuándo</h3>
                    <p>Enero 2024 | Bilbao, Donostia y Vitoria-Gasteiz</p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/pencil.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/pencil.svg"
                    />
                    <h3>Inscripción</h3>
                    <p>
                      <button className="botonAzul" onClick={() => handleButtonClick()}>Solicita más información</button>
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/time-clock.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/time-clock.svg"
                    />
                    <h3>Duración</h3>
                    <p>
                      136 horas de formación presencial o en presencia virtual.
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/currency-euro.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/currency-euro.svg"
                    />
                    <h3>Programa gratuito</h3>
                    <p>
                      Esta formación será gratuita para el participante y está
                      fiananciado por la Unión Europea Next Generation EU | Plan
                      de Recuperación y Resiliencia del Gobierno de España.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 offset-lg-1 caracInfoGrado">
                <ul>
                  <li>
                    <h4>Lugar:</h4>
                    <p>Campus Bilbao</p>
                    <p>Campus San Sebastián</p>
                    <p>Sede Vitoria-Gasteiz</p>
                  </li>
                  <li>
                    <h4>Titulación:</h4>
                    <p>Programa Transformación Digital para la PYME</p>
                  </li>
                  <li>
                    <h4>Idioma:</h4>
                    <p>Español</p>
                  </li>
                  <li>
                    <h4>Proceso de ingreso:</h4>
                    <p>Proceso de ingreso abierto</p>
                  </li>
                  <li>
                    <h4>Facultad:</h4>
                    <a
                      title="DBS"
                      href="https://www.deusto.es/es/inicio/somos-deusto/facultades/deusto-business-school"
                      target="_blank"
                    >
                      Deusto Business School
                    </a>
                  </li>
                  <li>
                    <h4>Comparte:</h4>
                    <ul className="comparteContenido">
                      <li>
                        <a
                          href="https://twitter.com/intent/tweet?&via=deusto&text=Programa+Transformaci%C3%B3n+Digital+para+la+PYME&url=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fexecutive-education%2Fprograma-transformacion-digital-pyme"
                          target="_blank"
                          title="Twitter"
                        >
                          <i
                            className="fa-brands fa-x-twitter"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.facebook.com/sharer.php?u=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme&p[title]=Programa Transformación Digital para la PYME&p[summary]="
                          target="_blank"
                          title="Facebook"
                        >
                          <i className="fab fa-facebook-f" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://www.linkedin.com/shareArticle?mini=true&url=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme&title=Programa Transformación Digital para la PYME&summary="
                          target="_blank"
                          title="LinkedIn"
                        >
                          <i
                            className="fab fa-linkedin-in"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:?subject=Programa Transformación Digital para la PYME - Universidad de Deusto&body=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme"
                          title="E-mail"
                        >
                          <i className="fas fa-envelope" aria-hidden="true" />
                        </a>
                      </li>
                      <li className="whatsHide">
                        <a
                          href="whatsapp://send?text=https://www.deusto.es/es/inicio/estudia/estudios/executive-education/programa-transformacion-digital-pyme?timestamp=1711449508837"
                          title="Whatsapp"
                          target="_blank"
                        >
                          <i className="fab fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          id="programa-gratuito"
          className="cl_FinanciacionEOI loopLogos carruselLogos"
        >
          <div className="container">
            <div className="tituloSeccion">
              <h2>Financiado por</h2>
            </div>
          </div>
          <div className="carousel-container">
            <div id="ca-container" className="ca-container">
              <div className="ca-nav">
                <i className="ca-nav-next" aria-hidden="true" />
                <i className="ca-nav-prev" aria-hidden="true" />
              </div>
              <div className="c-slide-background">
                <div className="ca-wrapper" style={{ overflow: "hidden" }}>
                  <div
                    className="ca-item ca-item-1"
                    style={{ position: "absolute", left: 0 }}
                  >
                    <div className="ca-item-main">
                      <div className="ca-icon">
                        <div>
                          <img
                            data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597431956148&ssbinary=true"
                            alt="Plan de Recuperación, Transformación y Resiliencia"
                            className="lazyloaded"
                            src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597431956148&ssbinary=true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ca-item ca-item-1"
                    style={{ position: "absolute", left: 286 }}
                  >
                    <div className="ca-item-main">
                      <div className="ca-icon">
                        <div>
                          <img
                            data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597431956148&ssbinary=true"
                            alt="Plan de Recuperación, Transformación y Resiliencia"
                            className="lazyloaded"
                            src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597431956148&ssbinary=true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ca-item ca-item-1"
                    style={{ position: "absolute", left: 572 }}
                  >
                    <div className="ca-item-main">
                      <div className="ca-icon">
                        <div>
                          <img
                            data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597331185298&ssbinary=true"
                            alt="Generacion D"
                            className="lazyloaded"
                            src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597331185298&ssbinary=true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ca-item ca-item-1"
                    style={{ position: "absolute", left: 858 }}
                  >
                    <div className="ca-item-main">
                      <div className="ca-icon">
                        <div>
                          <img
                            data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597431956141&ssbinary=true"
                            alt="Fondos Next Generation"
                            className="lazyloaded"
                            src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597431956141&ssbinary=true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ca-item ca-item-1"
                    style={{ position: "absolute", left: 1144 }}
                  >
                    <div className="ca-item-main">
                      <div className="ca-icon">
                        <div>
                          <img
                            data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1600620962382&ssbinary=true"
                            alt="Secretaría de Estado de Digitalización e Inteligencia Artificial"
                            className="lazyloaded"
                            src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1600620962382&ssbinary=true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="perfil-participante" className="sobreGrado">
          <div className="container">
            <div className="row">
              <div className="descrInfoGrado col-lg-8">
                <div className="tituloSeccion">
                  <h2>Este programa es para ti si</h2>
                </div>
                <div className="row">
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/multiple-11.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/multiple-11.svg"
                    />
                    <h3>1.</h3>
                    <p>
                      Desempeñas una
                      <strong>función directiva dentro de una PYME </strong>(con
                      una plantilla de entre 10 y 249 personas) ubicada en el
                      País Vasco.
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/b-check.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/b-check.svg"
                    />
                    <h3>2.</h3>
                    <p>
                      Buscas
                      <strong>
                        conocer la realidad de otras organizaciones y
                        profesionales
                      </strong>
                      para contrastarla con tu experiencia e inspirarte de cara
                      al futuro.
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/chart-bar-33.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/chart-bar-33.svg"
                    />
                    <h3>3.</h3>
                    <p>
                      Quieres <strong>entender y valorar el impacto</strong> que
                      provocaría en tu negocio.
                    </p>
                  </div>
                  <div className="col-lg-6 destacadoInfoGrado">
                    <img
                      width={76}
                      height={76}
                      data-src="https://www.deusto.es/estaticos/ud/iconNucleo/bulb-63.svg"
                      className="lazyloaded"
                      alt="null"
                      src="https://www.deusto.es/estaticos/ud/iconNucleo/bulb-63.svg"
                    />
                    <h3>4.</h3>
                    <p>
                      Te gustaría
                      <strong>
                        aterrizar los conocimientos y conceptos adquiridos
                      </strong>
                      en una hoja de ruta sobre la que construirás la estrategia
                      digital real de tu empresa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="beneficios"
          className="cf_QuéobtienesProgramaEOI carruselFichasAzul"
        >
          <div>
            <div className="container">
              <div className="tituloSeccion">
                <h2>¿Qué obtienes con el programa?</h2>
              </div>
              <div className="botonesCarrusel">
                <button className="izq" disabled="disabled">
                  <img
                    width={64}
                    height={64}
                    data-src="https://www.deusto.es/estaticos/ud/img/flechaDerechaSliderBlanco.svg"
                    alt="Flecha para desplazar el carrusel a la izquierda"
                    className="lazyload"
                  />
                </button>
                <button className="dcha">
                  <img
                    width={64}
                    height={64}
                    data-src="https://www.deusto.es/estaticos/ud/img/flechaDerechaSliderBlanco.svg"
                    alt="Flecha para desplazar el carrusel hacia la derecha"
                    className="lazyload"
                  />
                </button>
              </div>
            </div>
            <div className="carruselRazones marginC owl-loaded">
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(0px, 0px, 0px)",
                    transition: "all 0s ease 0s",
                    width: 2028,
                  }}
                >
                  <div className="owl-item active" style={{ width: "auto" }}>
                    <div className="razonBox">
                      <div>
                        <p>1.</p>
                      </div>
                      <div>
                        <p>
                          Conoce las herramientas y procesos&nbsp;que te
                          permitirán abordar una transformación tecnológica
                          integral en tu organización.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "auto" }}>
                    <div className="razonBox">
                      <div>
                        <p>2.</p>
                      </div>
                      <div>
                        <p>
                          Integra las tecnologías&nbsp;que te permitirán innovar
                          y automatizar los procesos de producción.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "auto" }}>
                    <div className="razonBox">
                      <div>
                        <p>3.</p>
                      </div>
                      <div>
                        <p>
                          Crea una cultura digital que transforme&nbsp;todas las
                          áreas de la empresa y forme parte del ADN de las
                          personas que la conforman.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "auto" }}>
                    <div className="razonBox">
                      <div>
                        <p>4.</p>
                      </div>
                      <div>
                        <p>
                          Genera sinergias y mejora la comunicación entre
                          diferentes áreas funcionales.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "auto" }}>
                    <div className="razonBox">
                      <div>
                        <p>5.</p>
                      </div>
                      <div>
                        <p>
                          Trabaja estrategias para conectar de manera más
                          efectiva&nbsp;con potenciales usuarios y para
                          fidelizar a tus actuales clientes.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "auto" }}>
                    <div className="razonBox">
                      <div>
                        <p>6.</p>
                      </div>
                      <div>
                        <p>
                          Diseña un plan de transformación digital&nbsp; a
                          medida para tu empresa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav">
                <button type="button" className="owl-prev disabled">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" className="owl-next">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots disabled" />
            </div>
          </div>
        </div>
        <div className="v_VideosTransformacioDigitalPYME sliderVideos">
          <div>
            <div className="container">
              <div className="tituloSeccion">
                <h2>La experiencia formativa desde dentro</h2>
              </div>
            </div>
            <div id="carruselVideos" className="carruselVideos marginC">
              <a
                className="videoBox"
                data-toggle="modal"
                data-target="#VideosTransformacioDigitalPYME0"
              >
                <div className="cabeceraTit">
                  <div>
                    <img
                      width={654}
                      height={388}
                      className="lazyload"
                      data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1600622579437&ssbinary=true"
                      alt="Jorge González Barturen"
                    />
                    <img
                      width={72}
                      height={72}
                      className="playVideo lazyload"
                      data-src="https://www.deusto.es/estaticos/ud/img/playVideo.svg"
                      alt="Icono para el play del video"
                    />
                  </div>
                  <div>
                    <p>Director académico del Programa</p>
                    <h3>Jorge González Barturen</h3>
                  </div>
                </div>
              </a>
              <a
                className="videoBox"
                data-toggle="modal"
                data-target="#VideosTransformacioDigitalPYME1"
              >
                <div className="cabeceraTit">
                  <div>
                    <img
                      width={654}
                      height={388}
                      className="lazyload"
                      data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fjpeg&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1600622579488&ssbinary=true"
                      alt="Ignacio Eguren"
                    />
                    <img
                      width={72}
                      height={72}
                      className="playVideo lazyload"
                      data-src="https://www.deusto.es/estaticos/ud/img/playVideo.svg"
                      alt="Icono para el play del video"
                    />
                  </div>
                  <div>
                    <p>
                      Director de finanzas de Muriel Wines y participante del
                      Programa
                    </p>
                    <h3>Ignacio Eguren</h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div>
            <div
              className="modal fade"
              id="VideosTransformacioDigitalPYME0"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <iframe
                      className="lazyload"
                      data-src="https://www.youtube.com/embed/qtlKoFcz7LY"
                      src=""
                      data-gtm-yt-inspected-432="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="VideosTransformacioDigitalPYME1"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <iframe
                      className="lazyload"
                      data-src="https://www.youtube.com/embed/6d1O7mG86b0"
                      src=""
                      data-gtm-yt-inspected-432="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="metodo" className="bloqueCifras">
          <div className="container">
            <div className="tituloSeccion">
              <h2>El método de Deusto Business School</h2>
            </div>
            <div className="row">
              <div className="col-xl-4 col-md-6 cifraBox">
                <div className="datoCifra">
                  <h3>
                    <span className="titulo">136</span>
                    <span className="subtitulo">horas lectivas</span>
                  </h3>
                </div>
                <p>de formación presencial o en presencia virtual</p>
              </div>
              <div className="col-xl-4 col-md-6 cifraBox">
                <div className="datoCifra">
                  <h3>
                    <span className="titulo">10</span>
                    <span className="subtitulo">sesiones presenciales</span>
                  </h3>
                </div>
                <p>1 al mes en horario de tarde</p>
              </div>
              <div className="col-xl-4 col-md-6 cifraBox">
                <div className="datoCifra">
                  <h3>
                    <span className="titulo">1</span>
                    <span className="subtitulo">Hoja de ruta </span>
                  </h3>
                </div>
                <p>
                  Proyecto de emprendimiento de aplicación real y tutorizado
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="cotenido" className="bannersInfoIcono">
          <div className="container">
            <div className="tituloSeccion">
              <h3>15 ECTS | 136 horas de formación presencial</h3>
              <h2>Contenido del Programa</h2>
            </div>
            <div className="row">
              <div className="col-lg-5 bloqueInfo">
                <img
                  width={72}
                  height={72}
                  data-src="https://www.deusto.es/estaticos/ud/iconNucleo/building.svg"
                  className="lazyload"
                  alt="null"
                />
                <div>
                  <h4>LA EMPRESA EN LA ECONOMÍA DIGITAL</h4>
                </div>
              </div>
              <div className="col-lg-5 bloqueInfo">
                <img
                  width={72}
                  height={72}
                  data-src="https://www.deusto.es/estaticos/ud/iconNucleo/spaceship.svg"
                  className="lazyload"
                  alt="null"
                />
                <div>
                  <h4>TRANSFORMANDO LA EXPERIENCIA DEL CLIENTE</h4>
                </div>
              </div>
              <div className="col-lg-5 bloqueInfo">
                <img
                  width={72}
                  height={72}
                  data-src="https://www.deusto.es/estaticos/ud/iconNucleo/responsive.svg"
                  className="lazyload"
                  alt="null"
                />
                <div>
                  <h4>HABILITANDO TECNOLÓGICAMENTE LA TRANSFORMACIÓN</h4>
                </div>
              </div>
              <div className="col-lg-5 bloqueInfo">
                <img
                  width={72}
                  height={72}
                  data-src="https://www.deusto.es/estaticos/ud/iconNucleo/bulb-63.svg"
                  className="lazyload"
                  alt="null"
                />
                <div>
                  <h4>Gestionando el cambio</h4>
                </div>
              </div>
              <div className="col-lg-5 bloqueInfo">
                <img
                  width={72}
                  height={72}
                  data-src="https://www.deusto.es/estaticos/ud/iconNucleo/single-position.svg"
                  className="lazyload"
                  alt="null"
                />
                <div>
                  <h4>CASOS DE USO SECTORIALES</h4>
                </div>
              </div>
              <div className="col-lg-5 bloqueInfo">
                <img
                  width={72}
                  height={72}
                  data-src="https://www.deusto.es/estaticos/ud/iconNucleo/network.svg"
                  className="lazyload"
                  alt="null"
                />
                <div>
                  <h4>
                    MENTORIZACIÓN PARA EL DESARROLLO DEL PLAN DE TRANSFORMACION
                    DIGITAL DE LA PYME
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="inscripcion" className="caracteristicasAlumno">
          <div className="container">
            <div className="row">
              <div className="tituloSeccion col-12">
                <h2>Proceso de inscripción</h2>
              </div>
              <div
                className="col-lg-5"
                id="acordeonAlumnoProcesodeinscripcionEOI"
              >
                <div className="bloqueAcordeon">
                  <div id="headingOne">
                    <h3
                      aria-controls="collapseOne"
                      aria-expanded="false"
                      className="collapsed"
                      data-target="#collapseOneProcesodeinscripcionEOI"
                      data-toggle="collapse"
                    >
                      <span>Paso 1: Rellena la inscripción</span>
                    </h3>
                  </div>
                  <div
                    aria-labelledby="headingOne"
                    className="collapse"
                    data-parent="#acordeonAlumnoProcesodeinscripcionEOI"
                    id="collapseOneProcesodeinscripcionEOI"
                  >
                    <p>Rellena el siguiente formulario de inscripción</p>
                    <p>
                      <a
                        className="enlaceFlechaAzul"
                        href="https://forms.deusto.es/deusto/transformacion-digital-para-pyme?_gl=1*vnqamx*_gcl_aw*R0NMLjE2ODY5MDUzNDUuQ2p3S0NBandrTENrQmhBOUVpd0FrYTlRUm5aRXlTc0NGYzJPc2hSdUZFMVl5TmFaVURXajhERlR2aUNBbFg0c3JoWTB0VG1UclI1cklob0NqbG9RQXZEX0J3RQ..*_gcl_au*NzE4MTUxNjk5LjE2ODUzNDYyMTI."
                        target="_blank"
                      >
                        Formulario de inscripción
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bloqueAcordeon">
                  <div id="headingTwo">
                    <h3
                      aria-controls="collapseTwo"
                      aria-expanded="false"
                      className="collapsed"
                      data-target="#collapseTwoProcesodeinscripcionEOI"
                      data-toggle="collapse"
                    >
                      <span>Paso 2: Realiza el test de madurez digital</span>
                    </h3>
                  </div>
                  <div
                    aria-labelledby="headingTwo"
                    className="collapse"
                    data-parent="#acordeonAlumnoProcesodeinscripcionEOI"
                    id="collapseTwoProcesodeinscripcionEOI"
                  >
                    <p>
                      Realiza el test de madurez digital y conoce el grado de
                      digitalización de tu PYME.
                    </p>
                    <p>
                      <a
                        className="enlaceFlechaAzul"
                        href="https://www.acelerapyme.es/quieres-conocer-el-grado-de-digitalizacion-de-tu-pyme"
                        target="_blank"
                      >
                        Test de madurez digital
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bloqueAcordeon">
                  <div id="headingThree">
                    <h3
                      aria-controls="collapseThree"
                      aria-expanded="false"
                      className="collapsed"
                      data-target="#collapseThreeProcesodeinscripcionEOI"
                      data-toggle="collapse"
                    >
                      <span>Paso 3: Solicita tu bono de formación</span>
                    </h3>
                  </div>
                  <div
                    aria-labelledby="headingThree"
                    className="collapse"
                    data-parent="#acordeonAlumnoProcesodeinscripcionEOI"
                    id="collapseThreeProcesodeinscripcionEOI"
                  >
                    <p>
                      Solicita tu bono de formación a través del siguiente
                      enlace:
                    </p>
                    <p>
                      <a
                        className="enlaceFlechaAzul"
                        href="https://www.eoi.es/es/generacion-digital-pymes"
                        target="_blank"
                      >
                        Bono de formación
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bloqueAcordeon">
                  <div id="headingFour">
                    <h3
                      aria-controls="collapseFour"
                      aria-expanded="false"
                      className="collapsed"
                      data-target="#collapseFourProcesodeinscripcionEOI"
                      data-toggle="collapse"
                    >
                      Paso 4: Envía tu documentación
                    </h3>
                  </div>
                  <div
                    aria-labelledby="headingFour"
                    className="collapse"
                    data-parent="#acordeonAlumnoProcesodeinscripcionEOI"
                    id="collapseFourProcesodeinscripcionEOI"
                  >
                    <p>Envía tu documentación al siguiente email:</p>
                    <p>
                      <a href="javascript:void(location.href='mailto:'+String.fromCharCode(116,100,64,100,101,117,115,116,111,46,101,115))">
                        td@deusto.es
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="imagenCaracAlumno">
                  <img
                    width={690}
                    height={452}
                    data-src="/sites/Satellite?blobcol=urldata&blobheader=image%2Fpng&blobheadername1=Expires&blobheadername2=content-type&blobheadername3=MDT-Type&blobheadervalue1=Thu%2C+10+Dec+2020+16%3A00%3A00+GMT&blobheadervalue2=image%2Fpng&blobheadervalue3=abinary%3Bcharset%3DUTF-8&blobkey=id&blobtable=MungoBlobs&blobwhere=1597437235035&ssbinary=true"
                    className="lazyload"
                    alt="null"
                  />
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="mas-informacion" className="dameros">
          <div className="container">
            <div className="tituloSeccion">
              <h2>Más Información</h2>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 dameroBox">
                <div className="textoDam">
                  <div>
                    <h3>Coordinación del Programa</h3>
                    <p>
                      <a href="javascript:void(location.href='mailto:'+String.fromCharCode(8203,116,100,64,100,101,117,115,116,111,46,101,115))">
                        td@deusto.es
                      </a>
                      <br />
                      <a href="tel:+34944139453">944 139 453</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 dameroBox">
                <div className="textoDam">
                  <div>
                    <h3>Dirección del Programa</h3>
                    <p>
                      <strong>Jorge González Barturen</strong>
                      <br />
                      <a href="javascript:void(location.href='mailto:'+String.fromCharCode(106,111,114,103,101,46,103,46,98,97,114,116,117,114,101,110,64,100,101,117,115,116,111,46,101,115))">
                        jorge.g.barturen@deusto.es
                      </a>
                    </p>
                    <p>
                      <strong>Iulen Ibañez Baños</strong>
                      <br />
                      <a href="javascript:void(location.href='mailto:'+String.fromCharCode(8203,8203,8203,8203,8203,8203,8203,105,117,108,101,110,46,105,98,97,110,101,122,98,64,100,101,117,115,116,111,46,101,115))">
                        iulen.ibanezb@deusto.es
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Start of Zopim Live Chat Script*/}
      {/*End of Zopim Live Chat Script*/}
      <table
        cellSpacing={0}
        cellPadding={0}
        role="presentation"
        className="gstl_50 gssb_c"
        style={{
          width: 2,
          display: "none",
          top: 3,
          position: "absolute",
          left: "-1px",
        }}
      >
        <tbody>
          <tr>
            <td className="gssb_f" />
            <td className="gssb_e" style={{ width: "100%" }} />
          </tr>
        </tbody>
      </table>
      <iframe
        name="__uspapiLocator"
        tabIndex={-1}
        role="presentation"
        aria-hidden="true"
        title="Blank"
        data-gtm-yt-inspected-432="true"
        style={{
          display: "none",
          position: "absolute",
          width: 1,
          height: 1,
          top: "-9999px",
        }}
      />
      <iframe
        tabIndex={-1}
        role="presentation"
        aria-hidden="true"
        title="Blank"
        src="https://consentcdn.cookiebot.com/sdk/bc-v4.min.html"
        data-gtm-yt-inspected-432="true"
        style={{ position: "absolute", width: 1, height: 1, top: "-9999px" }}
      />
      <div style={{ display: "none", visibility: "hidden" }}>
        <noscript />
      </div>
      <iframe
        allow="join-ad-interest-group"
        data-tagging-id="AW-933108985"
        data-load-time={1711449509068}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
        src="https://td.doubleclick.net/td/rul/933108985?random=1711449509059&cv=11&fst=1711449509059&fmt=3&bg=ffffff&guid=ON&async=1&gtm=45be43p0v9132822194z8864124373za201&gcd=13r3r3n2n5&dma_cps=sypham&dma=1&u_w=1280&u_h=720&url=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fexecutive-education%2Fprograma-transformacion-digital-pyme%3F_gl%3D1*1b2jsmr*_up*MQ..%26gclid%3DCjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE&ref=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fcursos-seminarios%3F_gl%3D1*1b2jsmr*_up*MQ..%26gclid%3DCjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE&hn=www.googleadservices.com&frm=0&tiba=Programa%20Transformaci%C3%B3n%20Digital%20para%20la%20PYME%20%7C%20Deusto&did=dMWZhNz&gdid=dMWZhNz&npa=0&us_privacy=1---&auid=770543948.1707986982&uaa=x86&uab=64&uafvl=Google%2520Chrome%3B123.0.6312.59%7CNot%253AA-Brand%3B8.0.0.0%7CChromium%3B123.0.6312.59&uamb=0&uam=&uap=Windows&uapv=15.0.0&uaw=0&fledge=1&data=ads_data_redaction%3Dfalse"
        data-gtm-yt-inspected-432="true"
      />
      <iframe
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
        src="https://5439012.fls.doubleclick.net/activityi;src=5439012;type=corp;cat=deust00i;ord=7181530953761;gtm_up=1;npa=0;gclaw=CjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE;gac=UA-52981353-5%3ACjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE%3BUA-52981353-2%3ACjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE;auiddc=770543948.1707986982;u1=Programa%20Generacion%20Digital%20Pymes;gdid=dMWZhNz;ps=1;pcor=1792642300;uaa=x86;uab=64;uafvl=Google%2520Chrome%3B123.0.6312.59%7CNot%253AA-Brand%3B8.0.0.0%7CChromium%3B123.0.6312.59;uamb=0;uam=;uap=Windows;uapv=15.0.0;uaw=0;gtm=45fe43p0z8864124373za201;gcs=G111;gcd=13r3r3n2n5;dma_cps=sypham;dma=1;epver=2;~oref=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fexecutive-education%2Fprograma-transformacion-digital-pyme%3F_gl%3D1*1b2jsmr*_up*MQ..%26gclid%3DCjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE?"
        data-gtm-yt-inspected-432="true"
      />
      <iframe
        allow="join-ad-interest-group"
        data-tagging-id="DC-5439012/corp/deust00i+standard"
        data-load-time={1711449509233}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
        src="https://td.doubleclick.net/td/fls/rul/activityi;fledge=1;src=5439012;type=corp;cat=deust00i;ord=7181530953761;gtm_up=1;npa=0;gclaw=CjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE;gac=UA-52981353-5%3ACjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE%3BUA-52981353-2%3ACjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE;auiddc=770543948.1707986982;u1=Programa%20Generacion%20Digital%20Pymes;gdid=dMWZhNz;ps=1;pcor=1792642300;uaa=x86;uab=64;uafvl=Google%2520Chrome%3B123.0.6312.59%7CNot%253AA-Brand%3B8.0.0.0%7CChromium%3B123.0.6312.59;uamb=0;uam=;uap=Windows;uapv=15.0.0;uaw=0;gtm=45fe43p0z8864124373za201;gcs=G111;gcd=13r3r3n2n5;dma_cps=sypham;dma=1;epver=2;~oref=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fexecutive-education%2Fprograma-transformacion-digital-pyme%3F_gl%3D1*1b2jsmr*_up*MQ..%26gclid%3DCjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE?"
        data-gtm-yt-inspected-432="true"
      />
      <iframe
        id="_hjSafeContext_46126389"
        title="_hjSafeContext"
        tabIndex={-1}
        aria-hidden="true"
        src="about:blank"
        data-gtm-yt-inspected-432="true"
        style={{
          display: "none !important",
          width: "1px !important",
          height: "1px !important",
          opacity: "0 !important",
          pointerEvents: "none !important",
        }}
      />
      <img
        id="CookiebotSessionPixel"
        src="https://imgsct.cookiebot.com/1.gif?dgi=f3097038-5bb6-4575-bd36-cf253f1fbeca"
        alt="Cookiebot session tracker icon loaded"
        data-cookieconsent="ignore"
        style={{ display: "none" }}
      />
      <iframe
        data-product="web_widget"
        title="No content"
        role="presentation"
        tabIndex={-1}
        allow="microphone *"
        aria-hidden="true"
        src="about:blank"
        data-gtm-yt-inspected-432="true"
        style={{
          width: 0,
          height: 0,
          border: 0,
          position: "absolute",
          top: "-9999px",
        }}
      />
      <div>
        <iframe
          title="Abre un widget desde donde se puede chatear con uno de los agentes"
          id="launcher"
          tabIndex={0}
          data-gtm-yt-inspected-432="true"
          style={{
            colorScheme: "light",
            width: 107,
            height: 50,
            padding: 0,
            margin: "10px 20px",
            position: "fixed",
            bottom: 0,
            overflow: "visible",
            opacity: 1,
            border: 0,
            zIndex: 999998,
            transitionDuration: "250ms",
            transitionTimingFunction: "cubic-bezier(0.645, 0.045, 0.355, 1)",
            transitionProperty: "opacity, top, bottom",
            right: 0,
          }}
        />
      </div>
      <noscript>
        &lt;img height="1" width="1" style="display: none"
        src="https://www.facebook.com/tr?id=2093663024174887&amp;amp;ev=PageView&amp;amp;noscript=1"
        /&gt;
      </noscript>
      <iframe
        allow="join-ad-interest-group"
        data-tagging-id="AW-933108985/PmsGCIiUlrQBEPm5-LwD"
        data-load-time={1711449595916}
        height={0}
        width={0}
        style={{ display: "none", visibility: "hidden" }}
        src="https://td.doubleclick.net/td/rul/933108985?random=1711449595908&cv=11&fst=1711449595908&fmt=3&bg=ffffff&guid=ON&async=1&gtm=45be43p0v9132822194z8864124373za201&gcs=G111&gcd=13r3r3n2n5&dma_cps=sypham&dma=1&u_w=1280&u_h=720&url=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fexecutive-education%2Fprograma-transformacion-digital-pyme%3F_gl%3D1*1b2jsmr*_up*MQ..%26gclid%3DCjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE&ref=https%3A%2F%2Fwww.deusto.es%2Fes%2Finicio%2Festudia%2Festudios%2Fcursos-seminarios%3F_gl%3D1*1b2jsmr*_up*MQ..%26gclid%3DCjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE&label=PmsGCIiUlrQBEPm5-LwD&hn=www.googleadservices.com&frm=0&tiba=Programa%20Transformaci%C3%B3n%20Digital%20para%20la%20PYME%20%7C%20Deusto&value=5&currency_code=EUR&did=dMWZhNz&gdid=dMWZhNz&edid=dMWZhNz&bttype=purchase&npa=0&us_privacy=1---&gtm_up=1&gclaw=CjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE&gac=UA-52981353-5%3ACjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE%3BUA-52981353-2%3ACjwKCAjw5ImwBhBtEiwAFHDZxynBAeD2puJDAfYi-_JnZnz1QI94plOgzSNWFinrrnOESyevKi5l5BoCz6MQAvD_BwE&auid=770543948.1707986982&uaa=x86&uab=64&uafvl=Google%2520Chrome%3B123.0.6312.59%7CNot%253AA-Brand%3B8.0.0.0%7CChromium%3B123.0.6312.59&uamb=0&uam=&uap=Windows&uapv=15.0.0&uaw=0&fledge=1&capi=1&data=ads_data_redaction%3Dfalse&ct_cookie_present=0"
        data-gtm-yt-inspected-432="true"
      />
      <iframe
        id="__JSBridgeIframe_1.0__"
        title="jsbridge___JSBridgeIframe_1.0__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe_SetResult_1.0__"
        title="jsbridge___JSBridgeIframe_SetResult_1.0__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe__"
        title="jsbridge___JSBridgeIframe__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe_SetResult__"
        title="jsbridge___JSBridgeIframe_SetResult__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe_1.0__"
        title="jsbridge___JSBridgeIframe_1.0__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe_SetResult_1.0__"
        title="jsbridge___JSBridgeIframe_SetResult_1.0__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe__"
        title="jsbridge___JSBridgeIframe__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
      <iframe
        id="__JSBridgeIframe_SetResult__"
        title="jsbridge___JSBridgeIframe_SetResult__"
        data-gtm-yt-inspected-432="true"
        style={{ display: "none" }}
      />
    </>
  );
};
export default MainPage;

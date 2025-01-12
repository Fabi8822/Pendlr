<template>
    <div
      v-if="isAGBPopupOpen"
      style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; padding: 20px; background: #333; border-radius: 10px; width: 500px; color: white; text-align: center; max-height: 80vh; overflow-y: auto;"
    >
      <div class="popup-header">
        <button @click="closePopup" class="close-btn">✖</button>
        <h2>AGB</h2>
      </div>
      <h1>Allgemeine Geschäftsbedingungen (AGB) für die Nutzung der Pendlr-App</h1>
  
      <hr>
  
      <h2>1. Anwendungsbereich und Geltung</h2>
      <p>1.1 Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der Pendlr-App (im Folgenden „App“), die von der <strong>Universität Bayreuth</strong> bereitgestellt wird.</p>
      <p>1.2 Mit der Registrierung und Nutzung der App erklärt sich der Nutzer mit diesen AGB einverstanden.</p>
      <p>1.3 Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, die Universität Bayreuth stimmt ihrer Geltung ausdrücklich zu.</p>
  
      <hr>
  
      <h2>2. Registrierung und Nutzung</h2>
      <p>2.1 Die Nutzung der App setzt eine Registrierung voraus. Nutzer müssen mindestens 18 Jahre alt und an der Universität Bayreuth immatrikuliert oder Mitarbeiter sein.</p>
      <p>2.2 Die Registrierung erfordert die Angabe einer gültigen E-Mail-Adresse im Format vorname.nachname@uni-bayreuth.de.</p>
      <p>2.3 Nutzer sind verpflichtet, ein sicheres Passwort zu wählen und dieses geheim zu halten. Die Weitergabe von Zugangsdaten an Dritte ist untersagt.</p>
      <p>2.4 Die App darf ausschließlich für private Zwecke und zur Organisation von Fahrgemeinschaften genutzt werden. Eine kommerzielle Nutzung ist untersagt.</p>
  
      <hr>
  
      <h2>3. Leistungsumfang</h2>
      <p>3.1 Die App bietet eine Plattform zur Vermittlung von Fahrgemeinschaften. Die Universität Bayreuth ist nicht Anbieter oder Organisator der Fahrgemeinschaften, sondern stellt lediglich die technische Infrastruktur bereit.</p>
      <p>3.2 Es besteht kein Anspruch auf eine ununterbrochene Verfügbarkeit der App. Die Universität Bayreuth behält sich das Recht vor, die App oder Teile davon jederzeit zu ändern, einzuschränken oder einzustellen.</p>
  
      <hr>
  
      <h2>4. Pflichten des Nutzers</h2>
      <p>4.1 Nutzer verpflichten sich, keine rechtswidrigen Inhalte in der App zu veröffentlichen, insbesondere keine beleidigenden, diskriminierenden, pornografischen oder urheberrechtsverletzenden Inhalte.</p>
      <p>4.2 Nutzer dürfen keine Daten in die App eingeben, die andere Personen ohne deren Einwilligung betreffen.</p>
      <p>4.3 Nutzer müssen sicherstellen, dass ihre Angaben wahrheitsgemäß und vollständig sind. Änderungen persönlicher Daten sind unverzüglich zu aktualisieren.</p>
      <p>4.4 Bei der Nutzung der App ist das geltende Recht einzuhalten, insbesondere die Straßenverkehrsordnung (StVO) und die Regelungen zum Versicherungsschutz.</p>
  
      <hr>
  
      <h2>5. Haftung</h2>
      <p>5.1 Die Universität Bayreuth haftet nicht für Schäden, die im Zusammenhang mit der Nutzung der App entstehen, es sei denn, sie beruhen auf Vorsatz oder grober Fahrlässigkeit.</p>
      <p>5.2 Die Universität Bayreuth übernimmt keine Haftung für das Zustandekommen oder die Durchführung von Fahrgemeinschaften, einschließlich Schäden, die während der Fahrten entstehen können.</p>
      <p>5.3 Nutzer sind selbst für die Einhaltung gesetzlicher Vorgaben (z. B. Versicherungen, Fahrberechtigungen) verantwortlich.</p>
  
      <hr>
  
      <h2>6. Datenschutz</h2>
      <p>6.1 Informationen zur Verarbeitung personenbezogener Daten finden Sie in der <strong>Datenschutzerklärung</strong>.</p>
      <p>6.2 Mit der Nutzung der App erklärt sich der Nutzer mit der Erhebung, Verarbeitung und Nutzung seiner Daten gemäß der Datenschutzerklärung einverstanden.</p>
  
      <hr>
  
      <h2>7. Kündigung und Sperrung</h2>
      <p>7.1 Nutzer können ihren Account jederzeit ohne Angabe von Gründen löschen.</p>
      <p>7.2 Die Universität Bayreuth behält sich das Recht vor, Nutzer bei Verstößen gegen die AGB oder geltendes Recht zu sperren oder deren Account zu löschen.</p>
      <p>7.3 Eine Sperrung oder Löschung des Accounts führt nicht zu einer Rückerstattung bereits gezahlter Gebühren, sofern solche erhoben wurden.</p>
  
      <hr>
  
      <h2>8. Änderung der AGB</h2>
      <p>8.1 Die Universität Bayreuth behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden den Nutzern mindestens 30 Tage vor ihrem Inkrafttreten mitgeteilt.</p>
      <p>8.2 Widerspricht der Nutzer den Änderungen nicht innerhalb von 30 Tagen, gelten die Änderungen als angenommen. Im Falle eines Widerspruchs behält sich die Universität Bayreuth das Recht vor, den Account des Nutzers zu sperren.</p>
  
      <hr>
  
      <h2>9. Schlussbestimmungen</h2>
      <p>9.1 Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
      <p>9.2 Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
      <p>9.3 Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz der Universität Bayreuth.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isAGBPopupOpen: Boolean,
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
  }
  </style>
  

<template>
  <div class="container">
    <div class="footer">
      <div class="social-media">
        <div class="logo">
          <img src="../assets/images/JAM-Furniture-Logo.png" alt="Logo" />
        </div>
        <div class="icons">
          <div class="x">
            <img src="../assets/images/icons8-twitterx.svg" alt="Twitterx" />
          </div>
          <div class="facebook">
            <img src="../assets/images/icons8-facebook.svg" alt="Facebook" />
          </div>
          <div class="linkedin">
            <img src="../assets/images/icons8-linkedin.svg" alt="Linkedin" />
          </div>
        </div>
        <div class="social-text">
          <p>
            We will be happy to have you with us on social media to stay
            informed of all new products and offers.
          </p>
        </div>
      </div>
      <div class="important-links">
        <ul class="links">
          <li>
            <a href="#">
              <span class="arrow-icon material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
              <p>important link</p></a
            >
          </li>
          <li>
            <a href="#">
              <span class="arrow-icon material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
              <p>important link</p></a
            >
          </li>
          <li>
            <a href="#">
              <span class="arrow-icon material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
              <p>important link</p></a
            >
          </li>
          <li>
            <a href="#">
              <span class="arrow-icon material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
              <p>important link</p></a
            >
          </li>
          <li>
            <a href="#">
              <span class="arrow-icon material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
              <p>important link</p></a
            >
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="locaions">
          <span class="info-icon material-symbols-outlined">location_on</span>
          <p class="info-text">Syria, Tartus, AL Mshabkeh, building Number 4, Room Number 220</p>
        </div>
        <div class="business-hours">
          <span class="info-icon material-symbols-outlined">schedule</span>
          <p class="info-text">Business Hours: From 10:00 To 18:00</p>
        </div>
        <div class="contacts">
          <span class="info-icon material-symbols-outlined">phone_in_talk</span>
          <p class="info-text">+963 982 152 369</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3.75rem;
  padding-block: 70px;
  margin-top: 50px;
}

.social-media {
  display: grid;
  gap: 2.5rem;
}

.logo img {
  width: 150px;
}

.icons {
  display: flex;
  gap: 0.625rem;
  width: fit-content;
}

.icons > * {
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  background-color: hsl(0, 0%, 19%);
  transition: 0.3s;
}

.icons > *:hover {
  background-color: var(--secondary-clr-100);
}

.social-text {
  color: var(--secondary-clr-700);
  font-size: 1rem;
}

ul.links {
  list-style-type: none;
}

ul.links > * {
  padding-block: 1rem;
}

ul.links > *:not(:last-child) {
  border-bottom: 1px solid var(--secondary-clr-300);
}

ul.links > * a {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  transition: 0.3s;
}

ul.links > * a:hover {
  transform: translateX(15px);
}

ul.links > * a p {
  color: var(--secondary-clr-700);
  font-size: 1rem;
}

.arrow-icon {
  font-size: 26px;
  color: var(--primary-clr-400);
}

.info {
  display: grid;
  gap: 0.625rem;
}

.locaions,
.business-hours,
.contacts {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.info-icon {
  font-size: 30px;
  color: var(--primary-clr-400);
}

.info-text {
  color: var(--secondary-clr-700);
  font-size: 1rem;
}
</style>

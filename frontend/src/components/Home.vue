<template>
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          Securing Pharmaceutical
          <span class="highlight">Supply Chains</span>
        </h1>
        <p class="hero-subtitle">
          A blockchain-powered solution ensuring transparency, traceability, and trust in pharmaceutical distribution from manufacturer to patient.
        </p>
        <div class="hero-buttons">
          <button class="btn primary" @click="goToLogin">Login</button>
          <a class="btn secondary" href="https://github.com/wyceee/pharma" target="_blank" rel="noopener noreferrer">View Repository</a>
        </div>
      </div>
    </div>
    <div class="hero-decor hero-decor-1"></div>
    <div class="hero-decor hero-decor-2"></div>
  </section>

  <div class="metrics-ticker">
      <div class="metric-item"><span class="metric-value">99.9%</span><span class="metric-label">Uptime</span></div>
      <div class="metric-item"><span class="metric-value">1000+</span><span class="metric-label">TPS</span></div>
      <div class="metric-item"><span class="metric-value">256-bit</span><span class="metric-label">Encryption</span></div>
      <div class="metric-item"><span class="metric-value">24/7</span><span class="metric-label">Monitoring</span></div>

      <div class="metric-item"><span class="metric-value">99.9%</span><span class="metric-label">Uptime</span></div>
      <div class="metric-item"><span class="metric-value">1000+</span><span class="metric-label">TPS</span></div>
      <div class="metric-item"><span class="metric-value">256-bit</span><span class="metric-label">Encryption</span></div>
      <div class="metric-item"><span class="metric-value">24/7</span><span class="metric-label">Monitoring</span></div>
  </div>

  <section id="about" class="about">
    <div class="about-container">
      <div class="about-header">
        <h2>About PharmaChain</h2>
        <p>Built on Hyperledger Fabric, our platform revolutionizes pharmaceutical supply chain management through immutable record-keeping and real-time tracking.</p>
      </div>
      <div class="about-content">
        <div class="about-left">
          <h3>Ensuring Drug Safety & Authenticity</h3>
          <div class="about-item">
            <CheckCircle class="about-icon" />
            <div>
              <h4>Complete Traceability</h4>
              <p>Track every pharmaceutical product from manufacturing to final distribution with immutable blockchain records.</p>
            </div>
          </div>
          <div class="about-item">
            <CheckCircle class="about-icon" />
            <div>
              <h4>Temperature Monitoring</h4>
              <p>Ensure cold chain integrity with continuous temperature monitoring and automated alerts for deviations.</p>
            </div>
          </div>
          <div class="about-item">
            <CheckCircle class="about-icon" />
            <div>
              <h4>Counterfeit Prevention</h4>
              <p>Combat counterfeit drugs with cryptographic verification and tamper-proof batch records.</p>
            </div>
          </div>
        </div>
        <div class="about-right">
          <div class="about-grid-outer-card">
            <div class="about-grid">
              <div class="about-grid-item">
                <div class="about-grid-icon"><Package /></div>
                <h4>Manufacturing</h4>
                <p>Secure product creation</p>
              </div>
              <div class="about-grid-item">
                <div class="about-grid-icon"><Truck /></div>
                <h4>Distribution</h4>
                <p>Tracked shipments</p>
              </div>
              <div class="about-grid-item">
                <div class="about-grid-icon"><Thermometer /></div>
                <h4>Monitoring</h4>
                <p>Temperature control</p>
              </div>
              <div class="about-grid-item">
                <div class="about-grid-icon"><Eye /></div>
                <h4>Inspection</h4>
                <p>Quality assurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="technology" class="technology">
    <div class="technology-container">
      <div class="technology-header">
        <h2>Built on Hyperledger Fabric</h2>
        <p>Enterprise-grade blockchain technology ensuring scalability, security, and regulatory compliance.</p>
      </div>
      <div class="technology-cards">
        <div class="technology-card">
          <div class="technology-icon"><Database /></div>
          <h3>Permissioned Network</h3>
          <p>Private blockchain network with controlled access ensuring data privacy and regulatory compliance.</p>
        </div>
        <div class="technology-card">
          <div class="technology-icon"><Zap /></div>
          <h3>High Performance</h3>
          <p>Optimized for enterprise workloads with high transaction throughput and low latency.</p>
        </div>
        <div class="technology-card">
          <div class="technology-icon"><Shield /></div>
          <h3>Enterprise Security</h3>
          <p>Advanced cryptographic security with digital signatures and certificate-based authentication.</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <img src="@/assets/Pharma.png" alt="PharmaChain Logo" class="footer-icon" />
      </div>
      <div class="footer-right">
        © 2025 PharmaChain. Securing pharmaceutical supply chains with blockchain technology.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  CheckCircle,
  Package,
  Truck,
  Thermometer,
  Eye,
  Database,
  Zap,
  Shield
} from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const router = useRouter()
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>

@keyframes ticker-move {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.hero {
  position: relative;
  background: #ABBAAB;
  background: linear-gradient(90deg, rgb(171, 186, 171) 0%, rgba(255, 255, 255, 1) 100%);
  overflow: hidden;
  padding: 4rem 1rem;
  margin-bottom: 4rem;
}

.hero-container {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #8CC342;
  display: block;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 48rem;
  margin: 0 auto 2rem auto;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
  }
}

.btn {
  font-weight: 600;
  padding: 1.3rem 4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn.primary {
  border: 1px solid #d1d5db;
  background-color: #013526;
  color: #fff;
}

.btn.primary:hover {
  background-color: #00432a;
}

.btn.secondary {
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn.secondary:hover {
  background-color: #f9fafb;
}

.hero-decor {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
}

.hero-decor-1 {
  top: 0;
  right: 0;
  margin-top: -1rem;
  margin-right: -1rem;
  width: 18rem;
  height: 18rem;
  opacity: 0.2;
}

.hero-decor-2 {
  bottom: 0;
  left: 0;
  margin-bottom: -1rem;
  margin-left: -1rem;
  width: 24rem;
  height: 24rem;
  opacity: 0.2;
}

.metrics-ticker {
  overflow: hidden;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  position: relative;
}

.metric-item {
  display: inline-flex;
  align-items: center;
  margin: 0 2.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.metric-value {
  margin-right: 0.5rem;
}

.metric-label {
  color: #4b5563;
  font-size: 1rem;
  margin-left: 0.2rem;
}

.metrics-ticker .metric-item:nth-child(1) .metric-value { color: #2563eb; }
.metrics-ticker .metric-item:nth-child(2) .metric-value { color: #22c55e; }
.metrics-ticker .metric-item:nth-child(3) .metric-value { color: #eab308; }
.metrics-ticker .metric-item:nth-child(4) .metric-value { color: #e11d48; }
.metrics-ticker .metric-item:nth-child(5) .metric-value { color: #2563eb; }
.metrics-ticker .metric-item:nth-child(6) .metric-value { color: #22c55e; }
.metrics-ticker .metric-item:nth-child(7) .metric-value { color: #eab308; }
.metrics-ticker .metric-item:nth-child(8) .metric-value { color: #e11d48; }

.about {
  padding: 5rem 1rem;
  background-color: #f8f8f8;
}

.about-container {
  max-width: 1500px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 5rem;
}

.about-header h2 {
  font-size: 3rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
}

.about-header p {
  font-size: 1.5rem;
  color: #4b5563;
  max-width: 70rem;
  margin: 0 auto;
}

.about-content {
  display: grid;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .about-content {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }
}

.about-left h3 {
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
}

.about-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.about-icon {
  color: #22c55e;
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.about-item h4 {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
  color: #111827;
}

.about-item p {
  font-size: 1rem;
  max-width: 35rem;
  color: #4b5563;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.about-grid-item {
  text-align: center;
}

.about-grid-icon {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 5px 2px rgba(0, 0, 0, 0.05);
}

.about-grid-icon :deep(svg) {
  width: 3rem;
  height: 3rem;
}

.about-grid-item:nth-child(1) .about-grid-icon {
  color: #2563eb;
}

.about-grid-item:nth-child(2) .about-grid-icon {
  color: #22c55e;
}

.about-grid-item:nth-child(3) .about-grid-icon {
  color: #f59e42;
}

.about-grid-item:nth-child(4) .about-grid-icon {
  color: #e11d48;
}

.about-grid-outer-card {
  background: #d1e1d1;
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
  padding: 2rem 1.3rem;
  margin: 0 auto;
}

.about-grid-item h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: -0.8rem;
  color: #111827;
}

.about-grid-item p {
  font-size: 1rem;
  color: #4b5563;
}

.technology {
  padding: 5rem 1rem;
  background-color: #ffffff;
}

.technology-container {
  max-width: 1280px;
  margin: 0 auto;
}

.technology-header {
  text-align: center;
  margin-bottom: 4rem;
}

.technology-header h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
}

.technology-header p {
  font-size: 1.5rem;
  color: #4b5563;
  max-width: 48rem;
  margin: 0 auto;
}

.technology-cards {
  display: grid;
  gap: 15rem;
}

@media (min-width: 1024px) {
  .technology-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.technology-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.technology-icon :deep(svg) {
  width: 2.6rem;
  height: 2.6rem;
}

.technology-icon {
  width: 7rem;
  height: 7rem;
  margin: 0 auto 1.5rem auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.technology-card:nth-child(1) .technology-icon {
  background: #dbeafe;
  color: #2563eb;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

.technology-card:nth-child(2) .technology-icon {
  background: #fef08a;
  color: #eab308;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);

}

.technology-card:nth-child(3) .technology-icon {
  background: #fecaca;
  color: #e11d48;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

.technology-card h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
}

.technology-card p {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 3rem;
}


.footer {
  background-color: #432400;
  color: #ffffff;
  padding: 3rem 1rem;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-icon {
  height: 55px;
  width: auto;
}

.footer-right {
  font-size: 0.875rem;
  color: #9ca3af;
}
</style>
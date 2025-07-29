import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

interface TestResult {
  endpoint: string;
  method: string;
  averageTime: number;
  minTime: number;
  maxTime: number;
  successRate: number;
  totalRequests: number;
}

class PerformanceTester {
  private results: TestResult[] = [];

  async testEndpoint(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    data?: any,
    headers?: any,
    iterations = 10
  ): Promise<TestResult> {
    console.log(`🧪 Test de ${method} ${endpoint} (${iterations} itérations)...`);
    
    const times: number[] = [];
    let successCount = 0;

    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();
      
      try {
        await axios({
          method,
          url: `${API_BASE_URL}${endpoint}`,
          data,
          headers,
          timeout: 10000,
        });
        
        const endTime = Date.now();
        times.push(endTime - startTime);
        successCount++;
      } catch (error) {
        console.warn(`❌ Échec requête ${i + 1}:`, error.message);
        times.push(10000); // Timeout comme temps max
      }
    }

    const result: TestResult = {
      endpoint,
      method,
      averageTime: times.reduce((a, b) => a + b, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      successRate: (successCount / iterations) * 100,
      totalRequests: iterations,
    };

    this.results.push(result);
    return result;
  }

  async runFullTest() {
    console.log('🚀 Démarrage des tests de performance...\n');

    // Test de santé
    await this.testEndpoint('/health');

    // Test d'authentification
    const loginData = {
      email: 'admin@admin.com',
      password: 'admin123',
    };

    const loginResult = await this.testEndpoint('/auth/login', 'POST', loginData);
    
    // Récupérer le token pour les tests authentifiés
    let authToken = '';
    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      authToken = loginResponse.data.token;
    } catch (error) {
      console.error('❌ Impossible de récupérer le token d\'authentification');
      return;
    }

    const authHeaders = {
      Authorization: `Bearer ${authToken}`,
    };

    // Tests avec authentification
    await this.testEndpoint('/users/me', 'GET', undefined, authHeaders);
    await this.testEndpoint('/users', 'GET', undefined, authHeaders);
    await this.testEndpoint('/dashboard', 'GET', undefined, authHeaders);
    await this.testEndpoint('/dashboard/stats', 'GET', undefined, authHeaders);

    // Tests de charge (plus d'itérations)
    console.log('\n🔥 Tests de charge...');
    await this.testEndpoint('/health', 'GET', undefined, undefined, 50);
    await this.testEndpoint('/dashboard', 'GET', undefined, authHeaders, 30);

    this.printResults();
  }

  printResults() {
    console.log('\n📊 RÉSULTATS DES TESTS DE PERFORMANCE');
    console.log('=====================================\n');

    this.results.forEach(result => {
      const status = result.successRate === 100 ? '✅' : result.successRate > 90 ? '⚠️' : '❌';
      const performance = result.averageTime < 100 ? '🚀' : result.averageTime < 500 ? '⚡' : '🐌';
      
      console.log(`${status} ${performance} ${result.method} ${result.endpoint}`);
      console.log(`   Temps moyen: ${result.averageTime.toFixed(2)}ms`);
      console.log(`   Min/Max: ${result.minTime}ms / ${result.maxTime}ms`);
      console.log(`   Taux de succès: ${result.successRate.toFixed(1)}%`);
      console.log(`   Requêtes: ${result.totalRequests}\n`);
    });

    // Résumé
    const avgResponseTime = this.results.reduce((sum, r) => sum + r.averageTime, 0) / this.results.length;
    const overallSuccessRate = this.results.reduce((sum, r) => sum + r.successRate, 0) / this.results.length;
    
    console.log('📈 RÉSUMÉ GLOBAL');
    console.log('================');
    console.log(`Temps de réponse moyen: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`Taux de succès global: ${overallSuccessRate.toFixed(1)}%`);
    
    // Recommandations
    console.log('\n💡 RECOMMANDATIONS');
    console.log('==================');
    
    const slowEndpoints = this.results.filter(r => r.averageTime > 500);
    if (slowEndpoints.length > 0) {
      console.log('🐌 Endpoints lents à optimiser:');
      slowEndpoints.forEach(r => {
        console.log(`   - ${r.method} ${r.endpoint} (${r.averageTime.toFixed(2)}ms)`);
      });
    }

    const unreliableEndpoints = this.results.filter(r => r.successRate < 95);
    if (unreliableEndpoints.length > 0) {
      console.log('⚠️ Endpoints peu fiables:');
      unreliableEndpoints.forEach(r => {
        console.log(`   - ${r.method} ${r.endpoint} (${r.successRate.toFixed(1)}% succès)`);
      });
    }

    if (slowEndpoints.length === 0 && unreliableEndpoints.length === 0) {
      console.log('🎉 Toutes les performances sont dans les normes!');
    }
  }
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  const tester = new PerformanceTester();
  tester.runFullTest().catch(console.error);
}

export { PerformanceTester };

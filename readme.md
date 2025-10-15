# 🌤️ OpenMeteo Performance Tests

Este repositório contém um conjunto de **testes de performance desenvolvidos com [k6](https://k6.io/)** para avaliar o tempo de resposta e a estabilidade da API pública do **[Open-Meteo](https://open-meteo.com/)**, que fornece previsões meteorológicas gratuitas.

## 🧭 Objetivo

O projeto tem como foco:

- Praticar o uso do **k6** em cenários reais de testes de performance.  
- Avaliar **latência**, **throughput** e **disponibilidade** da API.  
- Explorar o uso de **thresholds**, **checks** e **métricas visuais** no **Grafana Cloud**.  

## 🧱 Estrutura do Projeto

```bash
openmeteo-performance/
├── helpers/               # Dados auxiliares (cidades, thresholds, etc.)
├── results/               # Relatórios gerados (HTML, JSON, etc.)
├── scripts/               # Scripts de teste k6
│   ├── load-test.js       # Teste de carga (load test)
│   └── smoke-test.js      # Teste rápido de validação (smoke test)
```

## ⚙️ Requisitos
- Node.js
- k6
- (Opcional) Conta no Grafana Cloud para visualização de métricas.

## 🚀 Executando os Testes

Clonar o repositório:

```bash
git clone https://github.com/seuusuario/openmeteo-performance.git
cd openmeteo-performance
```

Executar o teste:
```bash
k6 run scripts/smoke-test.js
```

Executar o teste com relatório em HTML:
```bash
k6 run --out html=results/summary.html scripts/load-test.js
```

Executar em nuvem (Grafana Cloud):
```bash
k6 cloud scripts/load-test.js
```

## 📈 Exemplo de Resultados

Abaixo está um exemplo real de saída após a execução de um teste de carga com o k6:

```bash
running (15.0s), 5/5 VUs, 100 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  15s

     ✓ status é 200
     ✓ tempo de resposta < 800ms

     checks.........................: 100.00% ✓ 200 ✗ 0
     data_received..................: 150 kB  10 kB/s
     data_sent......................: 10 kB   0.7 kB/s
     http_req_blocked...............: avg=2.15ms   min=0s     med=0s     max=10.33ms  p(95)=5.67ms
     http_req_connecting............: avg=0.32ms   min=0s     med=0s     max=1.9ms    p(95)=1.1ms
     http_req_duration..............: avg=321.56ms min=210ms  med=300ms  max=700ms    p(95)=580ms
     http_req_failed................: 0.00%   ✓ 0   ✗ 100
     http_reqs......................: 100     6.6/s
     vus............................: 5       min=5  max=5
     vus_max........................: 5       min=5  max=5
```

## 📊 Métricas monitoradas

| Métrica               | Significado                              | Interpretação Prática                                         |
|------------------------|-------------------------------------------|---------------------------------------------------------------|
| **checks**             | Percentual de validações que passaram     | 100% indica que todos os asserts foram bem-sucedidos           |
| **http_req_duration**  | Tempo total das requisições               | Mede a latência — p95 < 800 ms é um bom resultado              |
| **http_req_failed**    | Taxa de falhas nas requisições            | Deve permanecer abaixo de 1%                                   |
| **data_received / sent** | Tráfego total no teste                   | Útil para avaliar volume de rede                               |
| **vus / vus_max**      | Número de usuários virtuais ativos        | Representa a carga simultânea do teste                         |

---

## 💡 Dica

- **p95** significa que **95% das requisições** tiveram tempo de resposta **igual ou inferior** ao valor mostrado.  
- O foco é observar **p95** e **taxa de falhas**, que são os melhores indicadores de estabilidade.  
- Resultados podem variar conforme a **conexão de rede** e a **disponibilidade da API testada**.     
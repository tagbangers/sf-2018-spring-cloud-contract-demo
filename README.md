# Spring Fest 2018 - Spring Data REST and Spring Cloud Contract

## Slide

https://www.slideshare.net/OgawaTakeshi/spring-datarestandspringcloudcontract

## Demonstration execution procedure (5 steps)

Note:  
`Consumer` is Frontend application that built by Angular.  
`Producer` is Backend application that built by Spring Data REST.

### 1. Checkout sources

```
git clone git@github.com:tagbangers/sf-2018-spring-cloud-contract-demo.git
```

### 2. Run Pact Broker (Docker)

```
cd sf-2018-spring-cloud-contract-demo/
docker-compose up -d
```

You can check the UI of Pact Broker by access to the following URL.  
http://localhost:8085

### 3. Run frontend (Consumer) tests

```
cd sf-2018-spring-cloud-contract-demo/frontend/
npm install
npm test
```

You can see that a Pact file is generated in the following path.  
`sf-2018-spring-cloud-contract-demo/frontend/pacts/frontend-backend.json`

### 4. Publish Pacts to Pact Broker

```
npm run publish-pacts 
```

You can see that the Pact file generated in Step 4 was published to Pact Broker.  
http://localhost:8085

### 5. Verify contract by backend (Producer)

```
cd sf-2018-spring-cloud-contract-demo/backend/
./mvnw clean install
```

At this time, Spring Cloud Contract will automatically fetch the Pact file from Pact Broker and convert it to Contract.  
Next, Generates unit test code automatically from Contract and execute it.  
We will verify that Contract is being protected by making all those tests successful.

You can check the automatically generated unit test code in the following pass.  
`sf-2018-spring-cloud-contract-demo/backend/target/generated-test-sources/contracts/springfest/backend/spring_fest/backend/ContractsTest.java`

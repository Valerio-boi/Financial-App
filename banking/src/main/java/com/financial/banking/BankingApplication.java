package com.financial.banking;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"com.financial.banking"})
@OpenAPIDefinition(info = @Info(title = "My API", version = "1.0", description = "Descrizione dell'API"))
@EnableJpaRepositories(basePackages = "com.financial.banking")
@EntityScan(basePackages = "com.financial.banking")
@EnableScheduling
public class BankingApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankingApplication.class, args);
	}

}

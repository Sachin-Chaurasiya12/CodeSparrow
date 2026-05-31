FROM maven:3.9-eclipse-temurin-21
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
ENTRYPOINT ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=docker"]
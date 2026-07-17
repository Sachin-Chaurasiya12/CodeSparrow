FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

EXPOSE 8761

CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.profiles=docker"]
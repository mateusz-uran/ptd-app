# Build stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=production
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/ptd-lite-*.jar /app/

EXPOSE 6565

ENV DB_URL=jdbc:postgresql://localhost:7432/ptd_db
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.data.mongodb.uri=${DB_URL} ptd-lite-${JAR_VERSION}.jar
# Stage 1: Build the application
FROM maven:latest AS build
WORKDIR /app

# Copy only the necessary files for dependency resolution
COPY ./pom.xml ./pom.xml
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY ./src ./src

# Build the application
RUN mvn package -DskipTests

# Stage 2: Create a new image for running the application
FROM openjdk:17-jdk-slim AS runtime
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port on which the Spring Boot application will run
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]

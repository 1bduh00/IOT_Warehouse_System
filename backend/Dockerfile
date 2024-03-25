# Build Stage (large image with build tools)
FROM adoptopenjdk:21-jre-hotspot AS builder

# Set working directory (optional based on Spring Boot project structure)
WORKDIR /app

# Copy your project code (replace with your actual context)
COPY . .

# Build commands using Maven (adjust for Gradle or others)
RUN mvn clean package

# Final Stage (slim runtime image)
FROM adoptopenjdk:21-jre-alpine AS runner

# Copy the JAR file from the build stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port for your Spring Boot application (adjust if needed)
EXPOSE 8080

# Command to run your Spring Boot application (replace if needed)
CMD ["java", "-jar", "app.jar"]

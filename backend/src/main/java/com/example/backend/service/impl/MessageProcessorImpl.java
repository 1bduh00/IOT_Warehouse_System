package com.example.backend.service.impl;

import com.azure.messaging.eventhubs.*;
import com.azure.messaging.eventhubs.checkpointstore.blob.BlobCheckpointStore;
import com.azure.messaging.eventhubs.models.*;
import com.azure.storage.blob.*;
import com.example.backend.service.MessageProcessoService;

import java.util.function.Consumer;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * MessageProcessor
 */
@Service
public class MessageProcessorImpl implements MessageProcessoService {

    private static final String connectionString = "Endpoint=sb://iothub-ns-warehouse-58097761-ffe855c6df.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=5OPsbXtY7UZps49x5QD1KxYYrHd6FeE/hAIoTJmXQdQ=;EntityPath=warehouse-hub";
    private static final String eventHubName = "warehouse-hub";
    private static final String storageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mysorageaccount1;AccountKey=8c6RhHv2EeFLzPmn/Z5fk5A8zfZT4vlVXvf7ybC+qr6bPyNWvHE36DFl3OjW2AujMjyubTAgneou+AStvgD4pQ==;EndpointSuffix=core.windows.net";
    private static final String storageContainerName = "firstcontainer";

    private static SimpMessagingTemplate messagingTemplate;

    public MessageProcessorImpl(SimpMessagingTemplate messagingTemplate) {
        MessageProcessorImpl.messagingTemplate = messagingTemplate;
    }

    public void StartConnection() throws Exception {

        BlobContainerAsyncClient blobContainerAsyncClient = new BlobContainerClientBuilder()
                .connectionString(storageConnectionString)
                .containerName(storageContainerName)
                .buildAsyncClient();

        // Create an event processor client builder
        EventProcessorClientBuilder eventProcessorClientBuilder = new EventProcessorClientBuilder()
                .connectionString(connectionString, eventHubName)
                .consumerGroup(EventHubClientBuilder.DEFAULT_CONSUMER_GROUP_NAME)
                .processEvent(PARTITION_PROCESSOR)
                .processError(ERROR_HANDLER)
                .checkpointStore(new BlobCheckpointStore(blobContainerAsyncClient));

        // Build the event processor client
        try {
            EventProcessorClient eventProcessorClient = eventProcessorClientBuilder.buildEventProcessorClient();
            System.out.println("Starting event processor");
            eventProcessorClient.start();

            System.out.println("Press enter to stop.");
            System.in.read();

            System.out.println("Stopping event processor");
            eventProcessorClient.stop();
            System.out.println("Event processor stopped.");

            System.out.println("Exiting process");
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
        }

    }

    public static final Consumer<EventContext> PARTITION_PROCESSOR = eventContext -> {
        PartitionContext partitionContext = eventContext.getPartitionContext();
        EventData eventData = eventContext.getEventData();

        System.out.println(eventData.getBodyAsString());
        SendDataToClient(eventData.getBodyAsString());
    };

    public static final Consumer<ErrorContext> ERROR_HANDLER = errorContext -> {
        System.out.printf("Error occurred in partition processor for partition %s, %s.%n",
                errorContext.getPartitionContext().getPartitionId(),
                errorContext.getThrowable());
    };

    public static void SendDataToClient(String payload) {
        String destination = "/topic/Data";
        messagingTemplate.convertAndSend(destination, payload);
    }
}

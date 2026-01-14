package kocak.springbootecommercce.dto;

import lombok.Data;
import lombok.NonNull;

public class PurchaseResponse {

    private String orderTrackingNumber;

    public PurchaseResponse(@NonNull String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }
}

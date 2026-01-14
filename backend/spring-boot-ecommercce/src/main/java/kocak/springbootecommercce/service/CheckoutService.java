package kocak.springbootecommercce.service;

import kocak.springbootecommercce.dto.Purchase;
import kocak.springbootecommercce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}

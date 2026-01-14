package kocak.springbootecommercce.dto;

import kocak.springbootecommercce.entity.Address;
import kocak.springbootecommercce.entity.Customer;
import kocak.springbootecommercce.entity.Order;
import kocak.springbootecommercce.entity.OrderItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Order order;
    private Set<OrderItem> orderItems;


    public Order getOrder() {
        return order;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public Customer getCustomer() {
        return customer;
    }
}

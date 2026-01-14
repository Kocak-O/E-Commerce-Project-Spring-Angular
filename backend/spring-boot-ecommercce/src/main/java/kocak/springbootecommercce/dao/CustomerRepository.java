package kocak.springbootecommercce.dao;

import kocak.springbootecommercce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}

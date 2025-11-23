package kocak.springbootecommercce.config;

import kocak.springbootecommercce.entity.Product;
import kocak.springbootecommercce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RestConfig implements WebMvcConfigurer {

    public RestConfig(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Product.class, ProductCategory.class);
        config.setDefaultPageSize(20);
    }
}

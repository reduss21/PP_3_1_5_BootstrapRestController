package ru.kata.spring.boot_security.demo.models;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name ="authority")
    private String authority;

    public Role() {
    }

    @Override
    public String toString() {
        return getAuthority().replaceFirst("ROLE_", "");
    }

    public Role(String authority) {
        this.authority = authority;
    }

    public Role(long id, String authority) {
        this.id = id;
        this.authority = authority;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    @Override
    public String getAuthority() {
        return this.authority;
    }
    public void setAuthority(String authority) { this.authority = authority; }
}

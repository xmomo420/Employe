package com.employe.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employe implements UserDetails {
    @Id
    private Integer id;
    private String prenom;
    private String nom;
    private String motDePasse;
    private String nomUtilisateur;
    private LocalDate dateEmbauche;
    private String numeroAssuranceSocial;
    private Role role;
    @MappedCollection(idColumn = "employe", keyColumn = "employe")
    private List<HoraireQuotidien> horairesQuotidiens;
    @MappedCollection(idColumn = "employe", keyColumn = "employe")
    private List<FeuilleDeTemps> feuillesDeTemps;
    private double tauxHoraire;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return motDePasse;
    }

    @Override
    public String getUsername() {
        return nomUtilisateur;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public enum Role {
        ADJOINT,
        ASSOCIE,
        GERANT
    }

}

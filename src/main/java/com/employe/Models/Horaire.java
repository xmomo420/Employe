package com.employe.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Horaire {
    @MappedCollection(keyColumn = "horaire_quotidien")
    private List<Quart> quartsTravail;
    private AggregateReference<Employe, Integer> employe;
    private LocalDate dateDebut;

}

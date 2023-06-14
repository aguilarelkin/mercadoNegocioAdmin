package com.mercado.app.mercadol.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "facturas")
@Getter @Setter
public class Factura implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	//@NotEmpty
	private String descripcion;

	private String observacion;

	@Temporal(TemporalType.DATE)
	@Column(name = "create_at")
	private Date createAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonBackReference
	private Cliente cliente;

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "factura_id")
	private List<ItemFactura> items;

	public Factura() {
		this.items = new ArrayList<ItemFactura>();
	}

	@PrePersist
	public void prePersist() {
		createAt = new Date();
	}

	public void addItemFactura(ItemFactura item) {
		this.items.add(item);
	}

	public Double getTotal() {
		Double total = 0.0;

		int size = items.size();

		for (int i = 0; i < size; i++) {
			total += items.get(i).calcularImporte();
		}
		return total;
	}

	private static final long serialVersionUID = 1L;
}

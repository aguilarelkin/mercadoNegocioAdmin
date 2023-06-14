package com.mercado.app.mercadol.models.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "facturas_items")
@Getter @Setter
public class ItemFactura implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Integer cantidad;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="producto_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Producto producto;


	public Double calcularImporte() {
		return cantidad.doubleValue() * producto.getPrecio();
	}
	
	private static final long serialVersionUID = 1L;

}

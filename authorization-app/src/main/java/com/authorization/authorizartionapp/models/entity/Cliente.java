package com.authorization.authorizartionapp.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "clientes")
@Getter
@Setter
public class Cliente implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	private String nombre;
	
	@NotEmpty
	private String apellido;
	
	@NotEmpty
	@Email
	@Column(unique = true)
	private String email;

	@Column(length = 60)
	private String password;

	@NotNull
	private Boolean enable;

	//@NotNull
	@Column(name = "create_at")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date createAt;



	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name="clientes_roles", joinColumns= @JoinColumn(name="cliente_id"),
			inverseJoinColumns=@JoinColumn(name="role_id"),
			uniqueConstraints= {@UniqueConstraint(columnNames= {"cliente_id", "role_id"})})
	private List<Role> roles;



	private String foto;

	@PrePersist
	public void prePersist() {
		createAt = new Date();
	}


	public void addRole(Role role) {
		roles.add(role);
	}

	@Override
	public String toString() {
		return email;
	}

}

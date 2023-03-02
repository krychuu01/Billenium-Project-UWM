package pl.uwm.projektzespolowy.models.board;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.BasicEntity;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.*;

import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;
import static pl.uwm.projektzespolowy.models.column.Column.UNLIMITED_SIZE;

@Entity
@Table(name = "boards")
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Board extends BasicEntity {

    String title;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    User creator;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    },
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_boards",
            joinColumns = @JoinColumn(name = "board_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> assignedUsers;

    @OneToMany(mappedBy = "board",
              cascade = { CascadeType.MERGE, CascadeType.PERSIST },
              orphanRemoval = true)
    List<Column> columns;

    public Board(String title, User creator) {
        this.title = title;
        this.creator = creator;
        this.assignedUsers = new HashSet<>();
        this.assignedUsers.add(creator);
        this.columns = List.of(
                new Column("Todo", UNLIMITED_SIZE, 0, this),
                new Column("In progress", DEFAULT_SIZE, 1, this),
                new Column("Done", UNLIMITED_SIZE, 2, this)
        );
    }

    public BoardResponseDTO toDto() {
        return BoardResponseDTO.builder()
                .title(this.title)
                .creatorName(this.creator.getFullName())
                .assignedUsers(this.assignedUsers.stream()
                        .map(User::toUserResponseDTO)
                        .toList())
                .columnList(this.columns.stream()
                        .map(Column::toDto)
                        .sorted(Comparator.comparingInt(ColumnResponseDTO::position))
                        .toList())
                .build();
    }

    public void assign(Column column) {
        this.columns.add(column);
    }

    public void assign(User user) {
        this.assignedUsers.add(user);
    }

    public String getTitle() {
        return title;
    }

    public User getCreator() {
        return creator;
    }

    public Set<User> getAssignedUsers() {
        return assignedUsers;
    }

    public List<Column> getColumns() {
        return columns;
    }
}
package pl.uwm.projektzespolowy.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

@Component
@RequiredArgsConstructor
public class BoardReader {

    private final BoardRepository repository;

    public Board getBoardById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board with id: " + id + " doesn't exists!"));
    }

}
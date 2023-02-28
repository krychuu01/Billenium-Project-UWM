package pl.uwm.projektzespolowy.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.user.UserRepository;

@Component
@RequiredArgsConstructor
public class BoardCreator {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    public Board createBoard(String title, Long ownerId) {
        var boardOwner = userRepository.getReferenceById(ownerId);
        return boardRepository.saveAndFlush(new Board(title, boardOwner));
    }
}
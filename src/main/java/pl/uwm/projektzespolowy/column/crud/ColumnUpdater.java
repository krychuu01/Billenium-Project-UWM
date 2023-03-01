package pl.uwm.projektzespolowy.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.basic.UpdateDTO;
import pl.uwm.projektzespolowy.basic.ValidatorService;
import pl.uwm.projektzespolowy.column.Column;
import pl.uwm.projektzespolowy.column.ColumnRepository;

@Component
@RequiredArgsConstructor
public class ColumnUpdater {

    private final ColumnRepository columnRepository;

    private final ColumnReader columnReader;
    private final ValidatorService validatorService;

    public void updateColumnField(Column column, String fieldName, Object value) {
        validatorService.isNull(fieldName, value);
        switch (fieldName) {
            case "title" -> {
                String title = (String) value;
                column.setTitle(title);
            }
            case "cardsLimit" -> {
                Integer cardsLimit = (Integer) value;
                column.setCardsLimit(cardsLimit);
            }
            case "position" -> {
                Integer position = (Integer) value;
                column.setPosition(position);
            }
        }
        columnRepository.saveAndFlush(column);
    }

    // TODO: Error handling
    public void updateColumn(UpdateDTO updateDTO) {
        var column = columnReader.getColumnById(updateDTO.id());
        updateColumnField(column, updateDTO.fieldName(), updateDTO.value());
    }

}
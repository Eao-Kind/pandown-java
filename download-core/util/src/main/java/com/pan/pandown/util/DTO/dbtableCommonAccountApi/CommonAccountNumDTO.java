package com.pan.pandown.util.DTO.dbtableCommonAccountApi;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author yalier(wenyao)
 * @Description
 * @since 2023-05-29
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonAccountNumDTO {
    private Integer accountNum;
    private Long availableAccountNum;
}

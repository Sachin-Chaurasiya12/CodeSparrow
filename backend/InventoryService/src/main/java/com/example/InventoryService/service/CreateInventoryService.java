package com.example.InventoryService.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.InventoryService.Exception.TitleAlreadyExistsException;
import com.example.InventoryService.model.Image;
import com.example.InventoryService.model.Inventory;
import com.example.InventoryService.model.titles;
import com.example.InventoryService.model.DTO.ContentRequestDto;
import com.example.InventoryService.model.DTO.ContentResponseDto;
import com.example.InventoryService.repository.InventoryRepository;
import com.example.InventoryService.repository.TitleRepository;
import com.example.InventoryService.service.Interface.ICreateInventoryService;

@Service
public class CreateInventoryService implements ICreateInventoryService {

    private final InventoryRepository inv;
    private final TitleRepository title;
    private final CloudinaryService service;

    public CreateInventoryService(
            InventoryRepository inv,
            TitleRepository title,
            CloudinaryService service) {
        this.inv = inv;
        this.title = title;
        this.service = service;
    }

    @Override
    public ContentResponseDto CreateNewContent(
            Long userid,
            ContentRequestDto request) {

        if (title.existsByUseridAndTitle(userid, request.getTitle())) {
            throw new TitleAlreadyExistsException("Title Already Exist");
        }

        titles titles = new titles();
        titles.setUserid(userid);
        titles.setTitle(request.getTitle());
        titles.setAddedon(LocalDateTime.now());
        titles.setActive(true);

        title.save(titles);

        Inventory inventory = new Inventory();
        inventory.setContent(request.getContent());
        inventory.setTitle(titles);
        inventory.setPublicid(request.getPublicid());
        inventory.setSecureurl(request.getSecureurl());
        inventory.setSecureurl2(request.getSecureurl2());
        inventory.setPublicid2(request.getPublicid2());

        inv.save(inventory);

        ContentResponseDto dto = new ContentResponseDto();
        dto.setTitle(titles.getTitle());
        dto.setTitle_id(titles.getId());
        return dto;
    }

    @Override
    public ResponseEntity<Map> uploadFileOne(Image image, Long userId) {

        try {

            if (image == null ||
                image.getFile() == null ||
                image.getFile().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Image file is required"));
            }

            titles t = title.findById(image.getTitleid())
                    .orElseThrow(() ->
                            new RuntimeException("Title not found"));

            if (!t.getUserid().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "You do not own this title"));
            }

            Inventory inventory = inv.findByTitle_Id(image.getTitleid())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Inventory not found for title "
                                            + image.getTitleid()));

            Map<?, ?> uploadresult =
                    service.UploadFile(image.getFile(), "inventory");

            String publicid =
                    (String) uploadresult.get("public_id");

            String secureurl =
                    (String) uploadresult.get("secure_url");

            inventory.setPublicid(publicid);
            inventory.setSecureurl(secureurl);

            inv.save(inventory);

            return ResponseEntity.ok(
                    Map.of(
                            "title_id", image.getTitleid(),
                            "public_id", publicid,
                            "secure_url", secureurl
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<Map> uploadFileTwo(Image image, Long userId) {

        try {

            if (image == null ||
                image.getFile() == null ||
                image.getFile().isEmpty()) {

                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Image file is required"));
            }

            titles t = title.findById(image.getTitleid())
                    .orElseThrow(() ->
                            new RuntimeException("Title not found"));

            if (!t.getUserid().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "You do not own this title"));
            }

            Inventory inventory = inv.findByTitle_Id(image.getTitleid())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Inventory not found for title "
                                            + image.getTitleid()));

            Map<?, ?> uploadresult =
                    service.UploadFile(image.getFile(), "inventory");

            String publicid =
                    (String) uploadresult.get("public_id");

            String secureurl =
                    (String) uploadresult.get("secure_url");

            inventory.setPublicid2(publicid);
            inventory.setSecureurl2(secureurl);

            inv.save(inventory);

            return ResponseEntity.ok(
                    Map.of(
                            "title_id", image.getTitleid(),
                            "public_id", publicid,
                            "secure_url", secureurl
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
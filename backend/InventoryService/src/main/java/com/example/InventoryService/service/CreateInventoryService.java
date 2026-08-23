package com.example.InventoryService.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.InventoryService.Exception.TitleAlreadyExistsException;
import com.example.InventoryService.Exception.TitleNotFoundException;
import com.example.InventoryService.Exception.UserNotFoundException;
import com.example.InventoryService.model.Image;
import com.example.InventoryService.model.Inventory;
import com.example.InventoryService.model.titles;
import com.example.InventoryService.model.DTO.ContentRequestDto;
import com.example.InventoryService.model.DTO.ContentResponseDto;
import com.example.InventoryService.model.DTO.UpdateRequest;
import com.example.InventoryService.repository.InventoryRepository;
import com.example.InventoryService.repository.TitleRepository;
import com.example.InventoryService.service.Interface.ICreateInventoryService;

@Service
public class CreateInventoryService implements ICreateInventoryService {

    private final InventoryRepository inv;
    private final TitleRepository title;
    private final CloudinaryService service;

    private Cloudinary cloudinary;

    public CreateInventoryService(
            InventoryRepository inv,
            TitleRepository title,
            CloudinaryService service,
            Cloudinary cloudinary) {
        this.inv = inv;
        this.title = title;
        this.service = service;
        this.cloudinary = cloudinary;
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
    public ResponseEntity<String> deleteSnippet(int id, Long userId) {

    try {
        titles t = title.findByIdAndUserid(id, userId)
                .orElseThrow(() ->
                    new RuntimeException("Snippet not found or unauthorized")
                );

        t.setActive(false);
        title.save(t);

        return ResponseEntity
                .accepted()
                .body("Snippet Deleted Successfully");

    } catch (Exception e) {
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }
    }

    @Override
    public ResponseEntity<String> updateSnippet(UpdateRequest request, Long userid) {
       
        titles t = title.findByIdAndUserid(request.getTitle_id(), userid).orElseThrow(
                () -> new UserNotFoundException("user not found")
        );

        Inventory i = inv.findByTitle_Id(request.getTitle_id()).orElseThrow(
                () -> new TitleNotFoundException("Title not found")
        );

        String oldPublicid = i.getPublicid();
        String oldPublicid2 = i.getPublicid2();

        i.setContent(request.getContent());

        i.setPublicid(request.getPublicid());
        i.setPublicid2(request.getPublicid1());
        i.setSecureurl(request.getSecureurl());
        i.setSecureurl2(request.getSecureurl1());

        inv.save(i);

        if(oldPublicid != null && !oldPublicid.equals(request.getPublicid())){
                deleteCloudinaryObject(oldPublicid);
        }
        
        if(oldPublicid2 != null && !oldPublicid2.equals(request.getPublicid())){
                deleteCloudinaryObject(oldPublicid2);
        }
        return ResponseEntity.ok("Snippet Updatd Successfully");

    }
     @Override
    public ResponseEntity<String> deleteImage(int titleId, int slot, Long userId) {
        try {
            titles t = title.findByIdAndUserid(titleId, userId)
                    .orElseThrow(() ->
                        new RuntimeException("Snippet not found or unauthorized")
                    );
 
            Inventory inventory = inv.findByTitle_Id(titleId)
                    .orElseThrow(() ->
                        new RuntimeException("Inventory not found for title " + titleId)
                    );
 
            if (slot == 1) {
                String publicid = inventory.getPublicid();
                if (publicid != null && !publicid.isEmpty()) {
                    deleteCloudinaryObject(publicid);
                }
                inventory.setPublicid(null);
                inventory.setSecureurl(null);
                
            } else if (slot == 2) {
                String publicid2 = inventory.getPublicid2();
                if (publicid2 != null && !publicid2.isEmpty()) {
                    deleteCloudinaryObject(publicid2);
                }
                inventory.setPublicid2(null);
                inventory.setSecureurl2(null);
            } else {
                return ResponseEntity.badRequest()
                        .body("Invalid slot. Use 1 or 2.");
            }
 
            inv.save(inventory);
 
            return ResponseEntity.ok("Image deleted successfully");
 
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    private void deleteCloudinaryObject(String publicid){
        try {
                cloudinary.uploader()
                        .destroy(publicid, ObjectUtils.emptyMap());
        } catch (Exception e) {
                System.err.println("Faild to delete File");
        }
    }
    
}
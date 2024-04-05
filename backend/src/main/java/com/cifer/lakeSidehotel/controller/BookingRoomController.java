package com.cifer.lakeSidehotel.controller;

import com.cifer.lakeSidehotel.dto.BookedResponse;
import com.cifer.lakeSidehotel.dto.RoomResponse;
import com.cifer.lakeSidehotel.exception.InvalidBookingRequestException;
import com.cifer.lakeSidehotel.exception.ResourceNotFoundException;
import com.cifer.lakeSidehotel.model.BookedRoom;
import com.cifer.lakeSidehotel.model.Room;
import com.cifer.lakeSidehotel.service.IBookedRoomService;
import com.cifer.lakeSidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingRoomController {
    private final IBookedRoomService bookingService;
    private final IRoomService roomService;
    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookedResponse>> getALlBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookedResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom bookingRoom : bookings) {
            BookedResponse bookingResponse = getBookingResponse(bookingRoom);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    private BookedResponse getBookingResponse(BookedRoom bookingRoom) {
        Room theRoom = roomService.getRoomById(bookingRoom.getBookingId()).get();
        RoomResponse room = new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getRoomPrice());
        return new BookedResponse(
                bookingRoom.getBookingId(),
                bookingRoom.getCheckInDate(),
                bookingRoom.getCheckOutDate(),
                bookingRoom.getGuestName(),
                bookingRoom.getGuestEmail(),
                bookingRoom.getNumOfAdults(),
                bookingRoom.getNumOfChildren(),
                bookingRoom.getTotalNumOfGuest(),
                bookingRoom.getBookingConfirmationCode(),
                room);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookedResponse bookedResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookedResponse);
        }catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/room/{id}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long id, @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(id, bookingRequest);
            return ResponseEntity.ok("Room booked successfully, your booking confirmation code is: " + confirmationCode);
        }catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{id}/delete")
    public void cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
    }
}

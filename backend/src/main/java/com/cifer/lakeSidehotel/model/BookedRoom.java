package com.cifer.lakeSidehotel.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    @Column(name = "Check_In")
    private LocalDate checkInDate;
    @Column(name = "Check_Out")
    private LocalDate checkOutDate;
    @Column(name = "Guest_Name")
    private String guestName;
    @Column(name = "Guest_Email")
    private String guestEmail;
    @Column(name = "Number_Of_Adults")
    private int numOfAdults;
    @Column(name = "Number_Of_Children")
    private int numOfChildren;
    @Column(name = "Total_Guests")
    private int totalNumOfGuest;
    @Column(name = "Confirmation_Code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Room_Id")
    private Room room;
    public void calculateTotalNumberOfGuest() {
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    public BookedRoom(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}


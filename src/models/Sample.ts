import mongoose from 'mongoose';

const { Schema } = mongoose;

const info = {
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  targetNumber: {
    type: String,
  },
  rank: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  isFather: {
    type: Boolean,
  },
  fatherNumber: {
    type: String,
  },
  motherName: {
    type: String,
  },
  isMother: {
    type: Boolean,
  },
  motherNumber: {
    type: String,
  },
};

const sampleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  sampleId: {
    type: String,
    required: true,
  },
  mainPhoto: {
    type: String,
    required: true,
  },
  male: info,
  female: info,
  greetingMessage: {
    type: String,
    required: true,
  },
  isD_day: {
    type: Boolean,
    required: true,
  },
  weddingDate: {
    type: String,
    required: true,
  },
  weddingTime: {
    type: String,
    required: true,
  },
  weddingAddress: {
    type: String,
    required: true,
  },
  weddingAddressName: {
    type: String,
    required: true,
  },
  DetailWeddingAddress: {
    type: String,
  },
  weddingContact: {
    type: String,
    required: true,
  },
  noticeTitle: {
    type: String,
  },
  noticeDescription: {
    type: String,
  },
  noticeURL: {
    type: String,
  },
  noticeButtonName: {
    type: String,
  },
  galleryType: {
    type: String,
  },
  galleryPictures: [{ type: String }],
  accountNumberList: [
    {
      target: {
        type: String,
      },
      isCheck: {
        type: Boolean,
      },
      targetBank: {
        type: String,
      },
      targetAccountNumber: {
        type: String,
      },
      accountHolder: { type: String },
    },
  ],
  wayToComeList: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  isGuestBook: {
    type: Boolean,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  kakaoThumbnail: {
    type: String,
  },
  kakaoTitle: {
    type: String,
  },
  kakaoDescription: {
    type: String,
  },
  URLThumbnail: {
    type: String,
  },
  URLTitle: {
    type: String,
  },
  URLDescription: {
    type: String,
  },
});

export default mongoose.model('Sample', sampleSchema);

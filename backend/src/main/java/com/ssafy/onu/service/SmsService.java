package com.ssafy.onu.service;

import com.ssafy.onu.dto.PhoneAuthDto;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
public class SmsService {

    @Value(value = "${cool.key}")
    private String smsApiKey;

    @Value("${cool.secret}")
    private String smsApiSecret;

    @Value("${cool.from}")
    private String from;

    private RedisUtil redisUtil;

    private final String PREFIX = "sms_";

    public SmsService(RedisUtil redisUtil) {
        this.redisUtil = redisUtil;
    }

//    final DefaultMessageService defaultMessageService;

    public SingleMessageSentResponse sendMessage(PhoneAuthDto phoneAuthDto) {
        String phone = phoneAuthDto.getPhone();

        DefaultMessageService defaultMessageService = NurigoApp.INSTANCE.initialize(smsApiKey, smsApiSecret, "https://api.coolsms.co.kr");
        Message message = new Message();
        message.setTo(phone);
        message.setFrom(from);

        String text = this.createMessageText(phone);
        message.setText(text);

        SingleMessageSentResponse response = defaultMessageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return response;
    }

    public String createMessageText(String phone) {
        String code = this.createRandomNum();  //임시 비밀번호
        redisUtil.setData(PREFIX + phone, code, 10);  //redis 캐시에 담기

        StringBuffer sb = new StringBuffer("OnU 휴대폰 본인인증\n");
        sb.append("본인인증 인증번호: [");
        sb.append(code);
        sb.append("]입니다.");

        return sb.toString();
    }

    public String createRandomNum() {
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for(int i=0; i<6; i++) {
            sb.append(random.nextInt(9));
        }
        return sb.toString();
    }

//    public boolean checkPhoneAuthCode(PhoneAuthDto phoneAuthDto, String code) {
//        String redisAuthCode = redisUtil.getData(PREFIX + phoneAuthDto.getPhone());
//
//        if(redisAuthCode!=null && redisAuthCode.equals(code)) {
//            return true;
//        } else {
//            return false;
//        }
//    }
}

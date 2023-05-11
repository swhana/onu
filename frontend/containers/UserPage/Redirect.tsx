//로그인 이후 리다이렉트될 화면
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import userStore from '@/store/userStore';
import { setCookie } from '@/apis/cookie';

const Redirect = () => {
  const params = useSearchParams();
  const { setUser } = userStore();
  const router = useRouter();

  //url에서 파라미터로 유저 정보 받아오기
  const id: number = Number(params.get('userId')) || 0;
  const nickname: string = params.get('userNickname') || '';
  const age: number = Number(params.get('age')) || 0;
  const gender: string = params.get('gender') || '';
  const accessToken: string = params.get('accessToken') || '';
  const refreshToken: string = params.get('refreshToken') || '';

  const userData = {
    id: id,
    nickname: nickname,
    age: age,
    gender: gender,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  useEffect(() => {
    //내부 전역상태에 유저 정보 저장
    setUser(id, nickname, age, gender, accessToken, refreshToken);
    //백업용 스토리지에 유저 정보 저장
    localStorage.setItem('userData', JSON.stringify(userData));
    //일단은 쿠키에 리프레시토큰 저장..
    setCookie('refreshToken', refreshToken);
  }, [id, nickname, age, gender, accessToken, refreshToken]);

  //유저 정보가 없으면 회원가입 페이지로 이동
  useEffect(() => {
    if (nickname === '' || age === 0 || gender === '') {
      router.push('/user/signup');
    } else router.push('/');
  }, []);

  return null;
};

export default Redirect;
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import BannerFrame from "@/components/BannerFramer/BannerFrame";
import clsx from "clsx";
import Datetime from "react-datetime";

import "react-datetime/css/react-datetime.css";
import { TAGS } from "@/constants/tags";
import Tag from "@/components/Tag/Tag";
import { useForm, Controller } from "react-hook-form";
import { createAccount } from "@/api/request";
import { AiFillBook } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [seletedTags, setSeletedTags] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<string[]>(TAGS);

  const handleSelectedTags = (name: string) => {
    const remainTags = tags.filter((tag) => tag !== name);
    setTags(remainTags);
    setSeletedTags([...seletedTags, name]);
  };

  const handleUnSelectedTags = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    event.stopPropagation();
    const remainTags = seletedTags.filter((tag) => tag !== name);
    setTags([...tags, name]);
    setSeletedTags(remainTags);
  };

  const onSubmit = async (data: AccountPayload) => {
    const payload: AccountPayload = {
      title: "test",
      banner:
        "https://supermomos-app-resourcesus.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
      capacity: 50,
      description: "test 1111",
      privacy: "Public",
      startAt: "2022-10-11T19:00:00+00:00",
      tags: ["Product", "Design"],
      venue: "Chelsea Market (163 W 20nd Street). Manhattan, NYC",
    };
    // const res = await createAccount(payload);
    console.log("📢 [index.tsx:59]", data);
  };
  return (
    <>
      <Head>
        <title>Supermomos</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Header />

        <section className={clsx(styles.sectionContainer)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={clsx(styles.gridParentContainer)}>
              <div className={clsx(styles.gridContainer)}>
                <div
                  className={clsx(
                    styles.wFull,
                    styles.mb12,
                    styles.gridTwoSpanCol
                  )}
                >
                  <div className={clsx(styles.inputWrapper)}>
                    <AiFillBook size={16} color='#14597A' />
                    <div className={clsx(styles.input, styles.wFull)}>
                      <input
                        type='text'
                        className={clsx(styles.wFull)}
                        {...register("title", {
                          required: "Title is required",
                        })}
                      />
                    </div>
                  </div>
                  {errors.title && (
                    <p className={clsx(inter.className)} role='alert'>
                      {errors.title?.message}
                    </p>
                  )}
                </div>

                {/* date */}
                <div className={clsx(styles.mb12, styles.wFull)}>
                  <div className={clsx(styles.inputWrapper, styles.row)}>
                    <Image
                      src='/assets/icons/date.svg'
                      width={16}
                      height={16}
                      alt='date icon'
                    />

                    <Controller
                      name='date'
                      control={control}
                      rules={{ required: "Date is required" }}
                      render={({
                        field: { onChange, onBlur, value, ref },
                        formState: { errors },
                      }) => (
                        <Datetime
                          closeOnSelect
                          className={clsx(
                            styles.input,
                            styles.wFull,
                            styles.unsetRelative
                          )}
                          dateFormat='MMMM DD, ddd'
                          timeFormat={false}
                        />
                      )}
                    />
                  </div>

                  {errors.date && (
                    <p className={clsx(inter.className)} role='alert'>
                      {errors.date?.message}
                    </p>
                  )}
                </div>

                {/* time */}
                <div className={clsx(styles.mb12)}>
                  <div className={clsx(styles.inputWrapper, styles.row)}>
                    <Image
                      src='/assets/icons/time.svg'
                      width={16}
                      height={16}
                      alt='time icon'
                    />
                    <Controller
                      name='time'
                      control={control}
                      rules={{ required: "Time is required" }}
                      render={({ field }) => (
                        <Datetime
                          closeOnSelect
                          className={clsx(
                            styles.input,
                            styles.wFull,
                            styles.unsetRelative
                          )}
                          timeFormat='h A'
                          dateFormat={false}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.time && (
                    <p className={clsx(inter.className)} role='alert'>
                      {errors.time?.message}
                    </p>
                  )}
                </div>

                {/* location */}
                <div
                  className={clsx(
                    styles.row,
                    styles.mb12,
                    styles.gridTwoSpanCol
                  )}
                >
                  <div className={clsx(styles.wFull)}>
                    <div className={clsx(styles.inputWrapper)}>
                      <Image
                        src='/assets/icons/location.svg'
                        width={14}
                        height={16}
                        alt='loaction icon'
                      />
                      <div className={clsx(styles.input, styles.wFull)}>
                        <input
                          type='text'
                          className={clsx(styles.wFull)}
                          {...register("venue", {
                            required: "Location is required",
                          })}
                        />
                      </div>
                    </div>
                    {errors.venue && (
                      <p role='alert' className={clsx(inter.className)}>
                        {errors.venue?.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* capacity */}
                <div className={clsx(styles.mb32)}>
                  <div className={clsx(styles.inputWrapper, styles.row)}>
                    <Image
                      src='/assets/icons/capacity.svg'
                      width={16}
                      height={14}
                      alt='capacity icon'
                    />
                    <div className={clsx(styles.input, styles.wFull)}>
                      <input
                        placeholder='Max capacity'
                        type='number'
                        min={0}
                        className={clsx(styles.wFull)}
                        {...register("capacity", {
                          required: "Max capacity is required",
                        })}
                      />
                    </div>
                  </div>
                  {errors.capacity && (
                    <p className={clsx(inter.className)} role='alert'>
                      {errors.capacity?.message}
                    </p>
                  )}
                </div>

                {/* cost */}
                <div
                  className={clsx(styles.inputWrapper, styles.row, styles.mb32)}
                >
                  <Image
                    src='/assets/icons/costs.svg'
                    width={16}
                    height={16}
                    alt='costs icon'
                  />
                  <div className={clsx(styles.input, styles.wFull)}>
                    <input
                      placeholder='Cost per person'
                      type='number'
                      min={0}
                      className={clsx(styles.wFull)}
                      {...register("cost")}
                    />
                  </div>
                </div>
              </div>
              <div className={clsx(styles.bannerFramer, styles.mb32)}>
                <BannerFrame />
              </div>
            </div>
            {/* description */}
            <div
              className={clsx(
                styles.wFull,
                styles.col,
                styles.mb32,
                styles.wResponsive
              )}
            >
              <label
                htmlFor='description'
                style={{ color: "#333", marginBottom: 6 }}
                className={clsx(inter.className, styles.tagDesc)}
              >
                Description
              </label>
              <textarea
                placeholder='Description of your event...'
                className={clsx(
                  styles.textarea,
                  inter.className,
                  styles.tagDesc
                )}
                name='description'
                id='description'
                cols='30'
                rows='10'
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p
                  className={clsx(inter.className)}
                  style={{ paddingLeft: 0 }}
                  role='alert'
                >
                  {errors.description?.message}
                </p>
              )}
            </div>

            {/* settings */}
            <div
              className={clsx(
                styles.settingsContainer,
                styles.mb32,
                styles.wResponsive
              )}
            >
              <h3
                className={clsx(
                  styles.textSettings,
                  inter.className,
                  styles.mb12
                )}
              >
                Settings
              </h3>

              <div className={clsx(styles.row, styles.mb12)}>
                <input
                  type='checkbox'
                  id='attendees'
                  name='attendees'
                  value='attendees'
                  className={clsx(styles.checkbox)}
                  {...register("attendees")}
                />
                <label
                  htmlFor='attendees'
                  className={clsx(
                    inter.className,
                    styles.tagDesc,
                    styles.tagColorBlack
                  )}
                >
                  I want to approve attendees
                </label>
              </div>
              <div>
                <p
                  className={clsx(
                    inter.className,
                    styles.tagHeader,
                    styles.tagColorBlack
                  )}
                >
                  Privacy
                </p>
                <div className={clsx(styles.row, styles.mb12)}>
                  <div className={clsx(styles.rowInline)}>
                    <input
                      type='radio'
                      id='public'
                      name='privacy'
                      value='Public'
                      {...register("privacy", {
                        required: "Privacy is required",
                      })}
                    />
                    <label
                      htmlFor='public'
                      className={clsx(inter.className, styles.tagDesc)}
                    >
                      Public
                    </label>
                  </div>
                  <div className={clsx(styles.rowInline)}>
                    <input
                      type='radio'
                      id='audience'
                      name='privacy'
                      value='Curated Audience'
                      {...register("privacy", {
                        required: "Privacy is required",
                      })}
                    />
                    <label
                      htmlFor='audience'
                      className={clsx(inter.className, styles.tagDesc)}
                    >
                      Curated Audience
                    </label>
                  </div>
                  <div className={clsx(styles.rowInline)}>
                    <input
                      type='radio'
                      id='community'
                      name='privacy'
                      value='Community Only'
                      {...register("privacy", {
                        required: "Privacy is required",
                      })}
                    />
                    <label
                      htmlFor='community'
                      className={clsx(inter.className, styles.tagDesc)}
                    >
                      Community Only
                    </label>
                  </div>
                </div>
                {errors.privacy && (
                  <p
                    role='alert'
                    className={clsx(inter.className)}
                    style={{ paddingLeft: 0, marginBottom: 2, marginTop: -8 }}
                  >
                    {errors.privacy?.message}
                  </p>
                )}
              </div>

              <div className={clsx(styles.col)}>
                <p
                  className={clsx(
                    inter.className,
                    styles.tagHeader,
                    styles.tagColorBlack
                  )}
                >
                  Tag your social
                </p>
                <p
                  className={clsx(inter.className, styles.tagDesc, styles.mb12)}
                >
                  Pick tags for our curation engine to work its magin
                </p>

                <div className={clsx(styles.row, styles.mb12)}>
                  {seletedTags.map((tag) => (
                    <Tag
                      key={tag}
                      name={tag}
                      isSelected
                      textStyle={inter.className}
                      handleUnSelected={(e) => handleUnSelectedTags(e, tag)}
                    />
                  ))}
                </div>
                <div className={clsx(styles.row)}>
                  {tags.map((tag) => (
                    <Tag
                      key={tag}
                      name={tag}
                      textStyle={inter.className}
                      handleSelect={() => handleSelectedTags(tag)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              type='submit'
              className={clsx(
                styles.submitBtn,
                styles.mb32,
                inter.className,
                styles.wResponsive
              )}
            >
              create social
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

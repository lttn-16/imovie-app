export interface RecommendContentVOList {
  category: number;
  contentType: string;
  id: number;
  imageUrl: string;
  jumpAddress: string;
  jumpType: string;
  needLogin: boolean;
  resourceNum?: any;
  resourceStatus?: any;
  showMark: boolean;
  title: string;
}

export interface HomeSection {
    bannerProportion?: any;
    coverType?: any;
    homeSectionId: number;
    homeSectionName: string;
    homeSectionType: string;
    recommendContentVOList: RecommendContentVOList[];
    refId?: any;
    refRedirectUrl: string;
  }

export interface Home<T>{
    page: number;
    recommendItems: T[];
    searchKeyword: string;
}

export interface APIResponse<T> {
    code: string;
    data: T;
    msg: string;
  }


export interface AdvanceSearch{
  searchResults: AdvanceSearchItem[];
}

  export interface TopBar<T> {
    list: T[];
  }
  
  export interface TopSearched {
    cover: string;
    domainType: number;
    id: string;
    title: string;
  }
  
export interface LikeListType{
  areaList: {
    id: number;
    name: string;
  }[];
  areaNameList: string[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  score: number;
  tagList: {
    id: number;
    name: string;
  }[];
  tagNameList: string[];
  upImgUrl: string;
  upName: string;
  year: number;
}

export interface EpisodeVoType{
  definitionList: {
    code: string;
    description: string;
    fullDescription: string;
  }[];
  id: number;
  name: string;
  resourceType: number;
  seriesNo: number;
  subtitlingList: SubList[];
  vid: string;
}

export interface SubList{
  language: string;
  languageAbbr: string;
  subtitlingUrl: string;
  translateType: number;
}

  export interface DetailType {
    aliasName: string;
    areaList: { id: number; name: string }[];
    areaNameList: string[];
    category: number;
    collect: boolean;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo: {
      drameName: string;
      drameType: string;
    };
    episodeCount?: any;
    episodeVo: EpisodeVoType[];
    id: string;
    introduction: string;
    likeList: LikeListType[];
    name: string;
    refList: {
      category: number;
      coverHorizontalUrl: string;
      coverVerticalUrl: string;
      drameTypeVo?: any;
      id: string;
      name: string;
      seriesNo: number;
    }[];
    reserved: boolean;
    score: number;
    seriesNo: number;
    showSetName: boolean;
    tagList: {
      id: number;
      name: string;
    }[];
    tagNameList: string[];
    translateType: number;
    upInfo: {
      upId: number;
      upImgUrl: string;
      upName: string;
    };
    updateInfo?: any;
    year: number;
  }

  export interface SearchResultList{
    searchResults: SearchResultItem[];
    searchType: string;
  }
  
  export interface SearchResultItem {
    areas: {
      id: number;
      name: string;
    }[];
    categoryTag: {
      id: number;
      name: string;
    }[];
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    domainType: number;
    dramaType: {
      code: string;
      name: string;
    };
    duration: string;
    id: string;
    name: string;
    releaseTime: string;
    sort: string;
    upInfo: {
      enable: boolean;
      upId: number;
      upImgUrl: string;
      upName: string;
    };
  }
  
  export interface SearchConfig {
    id: number;
    name: string;
    params: string;
    screeningItems: {
      id?: number;
      items: {
        name: string;
        params: string;
        screeningType: string;
      }[];
      name: string;
    }[];
  }
  
  export interface User {
    uid: string;
    email: string;
    photoURL: string;
    displayName: string;
  }
  
  export interface CommentType {
    id?: string;
    user: User;
    content: string;
    createdAt: Date;
  }
  
  export interface DiscoveryItem {
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    duration: number;
    id: string;
    introduction: string;
    like: boolean;
    likeCount: number;
    mediaInfo: {
      definitionList: {
        code: string;
        description: string;
        fullDescription: string;
      }[];
      id: number;
      resourceType: number;
      subtitlingList: any[];
    };
    name: string;
    refList: {
      category: number;
      coverHorizontalUrl: string;
      coverVerticalUrl: string;
      drameTypeVo: {
        drameName: string;
        drameType: string;
      };
      id: string;
      name: string;
      score: number;
      tagList: {
        id: number;
        name: string;
      }[];
      year: number;
    }[];
    upInfo: {
      enable: boolean;
      upId: number;
      upImgUrl: string;
      upName: string;
    };
  
    mediaUrl: string;
  }
  
  export interface AdvanceSearchItem {
    coverVerticalUrl: string;
    domainType: number;
    id: string;
    name: string;
    sort: string;
  }

  export interface SourceType {
    businessType: number;
    currentDefinition: string;
    episodeId: string;
    mediaUrl: string;
    totalDuration: number;
  }

export interface OptionList {
  name: string;
  params: string;
  screeningType: string;
}

export interface Details extends SourceType, DetailType {}


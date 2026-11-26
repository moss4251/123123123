import girlStandImg from '../../assets/girl-stand.png';
import boyStandImg from '../../assets/boy-stand.png';
import boy2Img from '../../assets/boy-2.png';
import girl2Img from '../../assets/girl-2.png';
import oldImg from '../../assets/old.png';

export interface SharingWay {
  id: number;
  label: string;
  groups: number;
  perGroup: number;
  phrase: string;
  characterImg: string;
  characterName: string;
  color: string;
  borderColor: string;
  bgTint: string;
}

export const SHARING_WAYS: SharingWay[] = [
  {
    id: 1,
    label: '分法一',
    groups: 2,
    perGroup: 6,
    phrase: '2个6',
    characterImg: girlStandImg,
    characterName: '笑笑',
    color: '#D97706',
    borderColor: '#F59E0B',
    bgTint: 'rgba(254, 243, 199, 0.72)',
  },
  {
    id: 2,
    label: '分法二',
    groups: 6,
    perGroup: 2,
    phrase: '6个2',
    characterImg: boyStandImg,
    characterName: '淘气',
    color: '#0284C7',
    borderColor: '#38BDF8',
    bgTint: 'rgba(224, 242, 254, 0.72)',
  },
  {
    id: 3,
    label: '分法三',
    groups: 3,
    perGroup: 4,
    phrase: '3个4',
    characterImg: boy2Img,
    characterName: '奇思',
    color: '#059669',
    borderColor: '#34D399',
    bgTint: 'rgba(209, 250, 229, 0.72)',
  },
  {
    id: 4,
    label: '分法四',
    groups: 4,
    perGroup: 3,
    phrase: '4个3',
    characterImg: girl2Img,
    characterName: '妙想',
    color: '#E11D48',
    borderColor: '#FB7185',
    bgTint: 'rgba(255, 228, 230, 0.72)',
  },
];

export interface DivisionWay {
  id: number;
  label: string;
  mode: 'byGroups' | 'bySize';
  groups: number;
  perGroup: number;
  phrase: string;
  info1: string;
  info2: string;
  info3: string;
  divisor: number;
  quotient: number;
  unit: string;
  characterImg: string;
  characterName: string;
  color: string;
  borderColor: string;
  bgTint: string;
}

export const DIVISION_WAYS: DivisionWay[] = [
  {
    id: 1,
    label: '分法一',
    mode: 'byGroups',
    groups: 2,
    perGroup: 6,
    phrase: '2个6',
    info1: '有12根香蕉',
    info2: '平均分成2份',
    info3: '每份6根',
    divisor: 2,
    quotient: 6,
    unit: '根',
    characterImg: girlStandImg,
    characterName: '笑笑',
    color: '#D97706',
    borderColor: '#F59E0B',
    bgTint: 'rgba(254, 243, 199, 0.72)',
  },
  {
    id: 2,
    label: '分法二',
    mode: 'byGroups',
    groups: 6,
    perGroup: 2,
    phrase: '6个2',
    info1: '有12根香蕉',
    info2: '平均分成6份',
    info3: '每份2根',
    divisor: 6,
    quotient: 2,
    unit: '根',
    characterImg: boyStandImg,
    characterName: '淘气',
    color: '#0284C7',
    borderColor: '#38BDF8',
    bgTint: 'rgba(224, 242, 254, 0.72)',
  },
  {
    id: 3,
    label: '分法三',
    mode: 'byGroups',
    groups: 3,
    perGroup: 4,
    phrase: '3个4',
    info1: '有12根香蕉',
    info2: '平均分成3份',
    info3: '每份4根',
    divisor: 3,
    quotient: 4,
    unit: '根',
    characterImg: boy2Img,
    characterName: '奇思',
    color: '#059669',
    borderColor: '#34D399',
    bgTint: 'rgba(209, 250, 229, 0.72)',
  },
  {
    id: 4,
    label: '分法四',
    mode: 'byGroups',
    groups: 4,
    perGroup: 3,
    phrase: '4个3',
    info1: '有12根香蕉',
    info2: '平均分成4份',
    info3: '每份3根',
    divisor: 4,
    quotient: 3,
    unit: '根',
    characterImg: girl2Img,
    characterName: '妙想',
    color: '#E11D48',
    borderColor: '#FB7185',
    bgTint: 'rgba(255, 228, 230, 0.72)',
  },
  {
    id: 5,
    label: '分法五',
    mode: 'bySize',
    groups: 6,
    perGroup: 2,
    phrase: '6个2',
    info1: '有12根香蕉',
    info2: '每份2个',
    info3: '分成6份',
    divisor: 2,
    quotient: 6,
    unit: '份',
    characterImg: girlStandImg,
    characterName: '笑笑',
    color: '#D97706',
    borderColor: '#F59E0B',
    bgTint: 'rgba(254, 243, 199, 0.72)',
  },
  {
    id: 6,
    label: '分法六',
    mode: 'bySize',
    groups: 2,
    perGroup: 6,
    phrase: '2个6',
    info1: '有12根香蕉',
    info2: '每份6个',
    info3: '分成2份',
    divisor: 6,
    quotient: 2,
    unit: '份',
    characterImg: boyStandImg,
    characterName: '淘气',
    color: '#0284C7',
    borderColor: '#38BDF8',
    bgTint: 'rgba(224, 242, 254, 0.72)',
  },
  {
    id: 7,
    label: '分法七',
    mode: 'bySize',
    groups: 4,
    perGroup: 3,
    phrase: '4个3',
    info1: '有12根香蕉',
    info2: '每份3个',
    info3: '分成4份',
    divisor: 3,
    quotient: 4,
    unit: '份',
    characterImg: boy2Img,
    characterName: '奇思',
    color: '#059669',
    borderColor: '#34D399',
    bgTint: 'rgba(209, 250, 229, 0.72)',
  },
  {
    id: 8,
    label: '分法八',
    mode: 'bySize',
    groups: 3,
    perGroup: 4,
    phrase: '3个4',
    info1: '有12根香蕉',
    info2: '每份4个',
    info3: '分成3份',
    divisor: 4,
    quotient: 3,
    unit: '份',
    characterImg: girl2Img,
    characterName: '妙想',
    color: '#E11D48',
    borderColor: '#FB7185',
    bgTint: 'rgba(255, 228, 230, 0.72)',
  },
];

export const WISE_ELDER_IMG = oldImg;

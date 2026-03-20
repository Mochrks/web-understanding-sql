import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Zap,
  Search,
  Filter,
  SortAsc,
  Link2,
  Table2,
  PlusCircle,
  HelpCircle,
  Edit,
  Trash2 as TrashIcon,
  ArrowUpNarrowWide,
  Sigma,
  Hash,
  ListFilter,
  Layers,
  Repeat,
  Code2,
  FileCode,
  ShieldCheck,
  Calendar,
  Eye,
  Settings2,
  AlertTriangle,
  KeyRound,
  Lock,
  Book,
} from 'lucide-react';

// Map topic IDs to Lucide icons
export const getLucideIcon = (topicId: string) => {
  const props = { className: "h-5 w-5" };
  const id = topicId.toLowerCase();
  
  if (id.includes('intro')) return <GraduationCap {...props} />;
  if (id.includes('syntax')) return <Code2 {...props} />;
  if (id.includes('select-distinct')) return <Sparkles {...props} />;
  if (id.includes('select')) return <Search {...props} />;
  if (id.includes('where')) return <Filter {...props} />;
  if (id.includes('order-by')) return <SortAsc {...props} />;
  if (id.includes('and') || id.includes('or') || id.includes('not')) return <Zap {...props} />;
  if (id.includes('insert')) return <PlusCircle {...props} />;
  if (id.includes('null')) return <HelpCircle {...props} />;
  if (id.includes('update')) return <Edit {...props} />;
  if (id.includes('delete')) return <TrashIcon {...props} />;
  if (id.includes('top') || id.includes('limit')) return <ArrowUpNarrowWide {...props} />;
  if (id.includes('aggregate')) return <Sigma {...props} />;
  if (id.includes('min') || id.includes('max') || id.includes('count') || id.includes('sum') || id.includes('avg')) return <Hash {...props} />;
  if (id.includes('like') || id.includes('wildcard')) return <Search {...props} />;
  if (id.includes('in') || id.includes('between')) return <ListFilter {...props} />;
  if (id.includes('alias')) return <Edit {...props} />;
  if (id.includes('join')) return <Link2 {...props} />;
  if (id.includes('union')) return <Layers {...props} />;
  if (id.includes('group-by')) return <Layers {...props} />;
  if (id.includes('having')) return <Filter {...props} />;
  if (id.includes('exists') || id.includes('any') || id.includes('all')) return <ShieldCheck {...props} />;
  if (id.includes('case')) return <Repeat {...props} />;
  if (id.includes('procedure')) return <FileCode {...props} />;
  if (id.includes('comment')) return <Edit {...props} />;
  if (id.includes('operator')) return <Sigma {...props} />;
  if (id.includes('create-db')) return <PlusCircle {...props} />;
  if (id.includes('drop-db')) return <TrashIcon {...props} />;
  if (id.includes('create-table')) return <Table2 {...props} />;
  if (id.includes('drop-table')) return <TrashIcon {...props} />;
  if (id.includes('alter-table')) return <Settings2 {...props} />;
  if (id.includes('constraint')) return <Lock {...props} />;
  if (id.includes('primary-key')) return <KeyRound {...props} />;
  if (id.includes('foreign-key')) return <Link2 {...props} />;
  if (id.includes('check')) return <ShieldCheck {...props} />;
  if (id.includes('default')) return <Settings2 {...props} />;
  if (id.includes('index')) return <Search {...props} />;
  if (id.includes('date')) return <Calendar {...props} />;
  if (id.includes('view')) return <Eye {...props} />;
  if (id.includes('injection')) return <AlertTriangle {...props} />;
  if (id.includes('data-type')) return <Hash {...props} />;
  if (id.includes('keyword')) return <Book {...props} />;
  if (id.includes('quick-ref')) return <Zap {...props} />;
  return <Table2 {...props} />;
};

interface TopicIconProps {
  topicId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TopicIcon: React.FC<TopicIconProps> = ({ topicId, size = 'md', className = '' }) => {
  const colors: Record<string, string> = {
    'blue': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'violet': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    'green': 'bg-green-500/10 text-green-600 dark:text-green-400',
    'amber': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    'red': 'bg-red-500/10 text-red-600 dark:text-red-400',
    'purple': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    'teal': 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    'pink': 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  };

  const getColor = (id: string) => {
    const lowerId = id.toLowerCase();
    if (lowerId.includes('select')) return colors.blue;
    if (lowerId.includes('where') || lowerId.includes('filter')) return colors.violet;
    if (lowerId.includes('join')) return colors.purple;
    if (lowerId.includes('insert') || lowerId.includes('create')) return colors.green;
    if (lowerId.includes('update') || lowerId.includes('alter')) return colors.amber;
    if (lowerId.includes('delete') || lowerId.includes('drop')) return colors.red;
    if (lowerId.includes('aggregate') || lowerId.includes('sum') || lowerId.includes('avg')) return colors.teal;
    return colors.blue;
  };

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg p-1.5',
    md: 'w-11 h-11 rounded-xl p-2.5',
    lg: 'w-14 h-14 rounded-2xl p-3.5',
  };

  return (
    <div className={`${sizeClasses[size]} ${getColor(topicId)} flex items-center justify-center flex-shrink-0 shadow-sm border border-current/10 ${className}`}>
      {getLucideIcon(topicId)}
    </div>
  );
};

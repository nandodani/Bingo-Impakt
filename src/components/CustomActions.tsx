import React, { useState } from 'react';
import useBingoStore from '../store/bingoStore';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, PlusIcon } from 'lucide-react';

const CustomActions = () => {
  const [newAction, setNewAction] = useState('');
  const addCustomAction = useBingoStore((state) => state.addCustomAction);
  const removeCustomAction = useBingoStore((state) => state.removeCustomAction);
  const customActions = useBingoStore((state) => state.customActions);

  const handleAddAction = () => {
    if (newAction.trim() !== '') {
      addCustomAction(newAction);
      setNewAction('');
    }
  };

  return (
    <div className="custom-actions">
        <Collapsible className="w-full" >
            <div className='flex items-center justify-between'>
                <h3 className='text-lg'>As minhas sugestões</h3>
                <CollapsibleTrigger asChild className="focus:outline-none">
                    <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <div className="add-action">
                    <input
                    type="text"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    placeholder="Sugestão"
                    />
                    <Button onClick={handleAddAction}><PlusIcon /></Button>
                </div>
                <ul>
                    {customActions.map((action, index) => (
                    <li key={index}>
                        {action}
                        <Button variant="destructive" onClick={() => removeCustomAction(index)}>Remover</Button>
                    </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    </div>
  );
};

export default CustomActions;
